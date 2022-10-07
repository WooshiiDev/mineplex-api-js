const fetch = require('node-fetch');

class Mineplex
{
    // --- Getters

    /**
     * The base API url.
     * @return {String} - Returns the API url
     */
    static get #api()
    {
        return 'https://mpstats.timmi6790.de/';
    }

    /**
     * The base url for leaderboards.
     * @return {String}
     */
    static get #webURL()
    {
        return 'https://www.mineplex.com/assets/www-mp/webtest/testy.php';
    }

    // --- Fetch Methods

    /**
     *
     * @param {String} endpoint
     * @returns {Promise<object>}
     */
    static async get(endpoint)
    {
        return await fetch(this.#api + endpoint);
    }

    // --- Leaderboard Methods

    /**
     * Get the leaderboard for a game, stat, and board
     * @param {GAMES | String} game - The game the leaderboard is for.
     * @param {String} stat - The stat the leaderboard is for.
     * @param {BOARDS | String} board - The leaderboard type to get.
     * @returns - The leaderboard for the game, stat, and board.
     */
    static async getLeaderboard(game, stat, board)
    {
        const request = appendValue(game, "?game=")
            + appendValue(stat, "&type=")
            + appendValue(board, "&boardType=");

        return this.#fetchLeaderboard(stat, request);

        function appendValue(value, prefix = "", suffix = "")
        {
            if (value === undefined)
            {
                return "";
            }

            return `${prefix}${value}${suffix}`
        }
    }

    /**
     * Fetches a leaderboard from the Mineplex site.
     * @param {String} title - The leaderboard title.
     * @param {String} request - The request to the website.
     */
    static async #fetchLeaderboard(title, request)
    {
        // Fetch url

        const url = `${this.#webURL}${request}`;
        const response = await fetch(url);

        // Handle errors

        if (response.status === 404)
        {
            const responseObject =
                {
                    request: request,
                    fullUrl: url,
                    status: response.status
                }

            console.error('Error fetching request, url returned 404.');
            console.error('Response: ' + JSON.stringify(responseObject, null, 4))

            return null;
        }

        // Return the leaderboard from the site

        const text = await response.text();
        const leaderboardData =  await this.#filterLeaderboardResponse(text);

        // If there's less than three array elements, there isn't a valid leaderboard.
        // This is the same if any undefined elements that exist

        if (leaderboardData.length < 3 || leaderboardData.includes(undefined))
        {
            console.error('Invalid request format for leaderboard. Data returned is invalid.');
            return null;
        }

        // Create a user array and populate with data found

        const incrementCount = 3; // 3 Fields per user
        const iterationCount = 50 * incrementCount; // Top 50 players

        const users = new Array(0);
        for (let i = 0; i < iterationCount; i += 3)
        {
            // Get Position | Name | Score

            const a = leaderboardData[i], b = leaderboardData[i + 1], c = leaderboardData[i + 2];

            // Format

            const position = parseInt(a);
            const name = b.toString();
            const score = parseInt(c.replace(/,/g,''), 10);

            users.push(new LeaderboardUser(name, score, position));
        }

        return new Leaderboard(title, users);
    }

    /**
     * Filters out text given from a leaderboard request, removing HTML tags and returning the leaderboard information.
     * @param text - The text to filter
     * @returns {String[]} - Returns an array containing all the leaderboard data.
     */
    static async #filterLeaderboardResponse(text)
    {
        // Need to exclude all unused information

        const invalidElements = ["IGN", "Wins"];

        // Remove HTML tags over the entire requested page, and space out the remaining pieces
        // Filter to remove all spacing

        let elements = text.replaceAll(/(<([^>]+)>)/ig, ' ').split(' ')
            .filter(x => x.trim() !== "");

        // Finally remove leaderboard headers

        const leaderboardIndex = elements.indexOf("Wins") + 1;
        elements.splice(0, leaderboardIndex).filter(element => !invalidElements.includes(element));

        return elements;
    }
}

/**
 * Class for representing a mineplex leaderboard.
 */
class Leaderboard
{
    // Fields

    /**
     * The name of the leaderboard.
     * @type {String}
     */
    #title = "Unnamed Leaderboard";

    /**
     * The leaderboard positions.
     * @type {Map<String, LeaderboardUser>}
     */
    #positions = new Map();

    //  Getters

    /**
     * Get the users in the leaderboard.
     * @return {IterableIterator<LeaderboardUser>}
     */
    get positions()
    {
        return this.#positions.values();
    }

    /**
     * Get the size of the leaderboard.
     * @return {Number}
     */
    get size()
    {
        return this.#positions.size;
    }

    get title()
    {
        return this.#title;
    }

    // Constructor

    /**
     * @param {String} title - Name of the leaderboard.
     * @param {LeaderboardUser[]} users - Initial users to populate the leaderboard with
     */
    constructor(title, users= [])
    {
        this.#title = title;

        for (let i = 0; i < users.length; i ++)
        {
            this.addUser(users[i]);
        }
    }

    // Methods

    /**
     * Add a user to the leaderboard.
     * @param {LeaderboardUser} user - The user to add.
     */
    addUser(user)
    {
        if (user === undefined)
        {
            console.error("Cannot add undefined user to leaderboard.");
            return;
        }

        if (this.hasUser(user))
        {
            console.warn(`Cannot add already existing user ${user.name} to leaderboard.`);
            return;
        }

        this.#positions.set(user.name, user);
    }

    /**
     * Check if the leaderboard contains a user.
     * @param {LeaderboardUser} user - The user to check.
     * @returns Returns a boolean based on whether the user is a part of the leaderboard.
     */
    hasUser(user)
    {
        if (user === undefined)
        {
            return false;
        }

        return this.#positions.has(user.name);
    }

    /**
     * Calls the callback function for each position in the positions array.
     * @param {function(LeaderboardUser, String)} callback - The function to call for each element in the array.
     */
    forEach(callback)
    {
        this.#positions.forEach(callback);
    }
}

/**
 * Container for a user on a leaderboard.
 */
class LeaderboardUser
{
    // Fields

    /**
     * The name of the user.
     * @type {String}
     */
    #name = "";

    /**
     * The users score.
     * @type {Number}
     */
    #score = 0;

    /**
     * The leaderboard position.
     * @type {Number}
     */
    #position = -1;

    // Constructor

    /**
     * @param {String} name - Name of the user.
     * @param {Number} score - The users score.
     * @param {Number} position - The leaderboard position.
     */
    constructor(name, score, position)
    {
        this.#position = position;
        this.#name = name;
        this.#score = score;
    }

    // Getters

    /**
     * Get the name of the user.
     * @return {String}
     */
    get name()
    {
        return this.#name;
    }

    /**
     * Get the users leaderboard score.
     * @return {Number}
     */
    get score()
    {
        return this.#score;
    }

    /**
     * Get the users position on the leaderboard.
     * @return {Number}
     */
    get position()
    {
        return this.#position;
    }

    // --- Overrides

    /**
     * The toString() method returns a string representing the user.
     * @returns {String}
     */
    toString()
    {
        let position = this.position.toString();

        if (position.length === 1)
        {
            position = ` ${position}`;
        }

        return `${position} ｜ ${this.name} - ${this.score}`;
    }
}

module.exports = {Mineplex, Leaderboard, LeaderboardUser};