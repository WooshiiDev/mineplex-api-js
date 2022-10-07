// noinspection JSUnusedGlobalSymbols

const keys = require("./api/mp-keys");
const {Mineplex} = require("./api/mp-fetch");

class Stats {

    // --- Leaderboards

    /**
     * Get the leaderboards for wins in the given game.
     * @param {GAMES | String} game - The game mode.
     * @param {BOARDS | String} board - The leaderboard duration type.
     * @returns {Promise<null|Leaderboard>} - Returns the fetched leaderboard for wins.
     * Can return null if a leaderboard cannot be found for the given parameters.
     */
    static async getWinLeaderboard(game, board)
    {
        return await Mineplex.getLeaderboard(game, "Wins", board);
    }

    // --- Endpoints

    /**
     * Get the leaderboards for a particular stat in the given game.
     * @param {GAMES | String} game - The game mode.
     * @param {String} stat - The stat the leaderboard is for.
     * @param {BOARDS | String} board - The leaderboard duration type.
     * @returns {Promise<null|Leaderboard>} - Returns the fetched leaderboard.
     * Can return null if a leaderboard cannot be found for the given parameters.
     */
    static async getLeaderboard(game, stat, board)
    {
        return await Mineplex.getLeaderboard(game, stat, board);
    }
}

const stats = new Stats();
module.exports = stats;