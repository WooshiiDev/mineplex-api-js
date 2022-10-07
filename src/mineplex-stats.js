// noinspection JSUnusedGlobalSymbols

const keys = require("./api/mp-keys");
const {Mineplex} = require("./api/mp-fetch");

/**
 * Options required for Mineplex endpoints
 */
class endpointOptions
{
    /**
     * The board required.
     * @type {keys.BOARDS | string}
     */
    board = undefined;

    /**
     * The game category required.
     * @type {string}
     */
    category = undefined;

    /**
     * The game required.
     * @type {keys.GAMES  | string}
     */
    game = undefined;

    /**
     * The group required.
     * @type {string}
     */
    group = undefined;

    /**
     * The platform required. Note: this is always needed.
     * @type {keys.PLATFORMS  | string}
     */
    platform = undefined;

    /**
     * The name of the player to look for.
     * @type {string}
     */
    player = undefined;

    /**
     * The stat to look for.
     * @type {string}
     */
    stat = undefined;

    /**
     * The player UUID if required.
     * @type {string}
     */
    uuid = undefined;
}

class Stats {
    constructor() {

        /**
         * All available endpoints. Will only return endpoint strings, not the request itself.
         * @property boards - Contains endpoints for boards.
         * @property filters - Contains endpoints for filters.
         * @property games - Contains endpoints for games.
         * @property groups - Contains endpoints for groups.
         * @property leaderboards - Contains endpoints for leaderboards.
         * @property players - Contains endpoints for player information or stats.
         * @property stats - Contains endpoints for general stats on.
         * @property website - Contains endpoints for information displayed on the website.
         */
        this.endpoints =
        {
            /**
             * Endpoints regarding board types.
             */
            boards:{

                /**
                 * Get all available boards.
                 * @param {endpointOptions | {}} options - The options for this endpoint.
                 * @returns {string} - Returns the created endpoint.
                 */
                getAll: (options = {}) => {
                    return this.getPlatformEndpoint(
                        keys.ENDPOINTS.BOARDS,
                        options.platform
                    );
                },

                /**
                 * Get a board by name.
                 * @param {endpointOptions | {}} options - The options for this endpoint.
                 * @returns {string} - Returns the created endpoint.
                 */
                get: (options = {}) => {
                    return this.getPlatformEndpoint(
                        this.formatEndpoint(keys.ENDPOINTS.BOARD, options.board),
                        options.platform
                    );
                }
            },

            /**
             * Endpoints regarding filters.
             */
            filters: {
                /**
                 * Get all available filters.
                 * @param {endpointOptions | {}} options - The options for this endpoint.
                 * @returns {string} - Returns the created endpoint.
                 */
                getAll: (options = {}) => {
                    return this.getPlatformEndpoint(
                        keys.ENDPOINTS.FILTERS,
                        options.platform
                    );
                },

                /**
                 * Get all available filter reasons.
                 * @param {endpointOptions | {}} options - The options for this endpoint.
                 * @returns {string} - Returns the created endpoint.
                 */
                getAllReasons: (options = {}) => {
                    return this.getPlatformEndpoint(
                        keys.ENDPOINTS.FILTER_REASONS,
                        options.platform
                    );
                }
            },

            /**
             * Endpoints regarding Mineplex games.
             */
            games: {

                /**
                 * Get all available games.
                 * @param {endpointOptions | {}} options - The options for this endpoint.
                 * @returns {string} - Returns the created endpoint.
                 */
                getAll: (options = {}) => {
                    return this.getPlatformEndpoint(
                        keys.ENDPOINTS.GAMES,
                        options.platform
                    );
                },

                /**
                 * Get a game by name.
                 * @param {endpointOptions | {}} options - The options for this endpoint.
                 * @returns {string} - Returns the created endpoint.
                 */
                get: (options = {}) => {
                    return this.getPlatformEndpoint(
                        this.formatEndpoint(keys.ENDPOINTS.GAME, options.game),
                        options.platform
                    );
                },

                /**
                 * Get all game categories.
                 * @param {endpointOptions | {}} options - The options for this endpoint.
                 * @returns {string} - Returns the created endpoint.
                 */
                getAllCategories: (options = {}) => {
                    return this.getPlatformEndpoint(
                        keys.ENDPOINTS.GAME_CATEGORIES,
                        options.platform
                    );
                },

                /**
                 * Get a game category by name.
                 * @param {endpointOptions | {}} options - The options for this endpoint.
                 * @returns {string} - Returns the created endpoint.
                 */
                getCategory: (options = {}) => {
                    return this.getPlatformEndpoint(
                        this.formatEndpoint(keys.ENDPOINTS.GAME_CATEGORY, options.category),
                        options.platform
                    );
                }
            },

            /**
             * Endpoints regarding groups.
             */
            groups: {

                /**
                 * Get all groups available.
                 * @param {endpointOptions | {}} options - The options for this endpoint.
                 * @returns {string} - Returns the created endpoint.
                 */
                getAll: (options = {}) => {
                    return this.getPlatformEndpoint(
                        keys.ENDPOINTS.GROUPS,
                        options.platform
                    );
                },

                /**
                 * Get a group by name.
                 * @param {endpointOptions | {}} options - The options for this endpoint.
                 * @returns {string} - Returns the created endpoint.
                 */
                get: (options = {}) => {
                    return this.getPlatformEndpoint(
                        this.formatEndpoint(keys.ENDPOINTS.GROUP, options.group),
                        options.platform
                    );
                },

                /**
                 * Get stat information on a player that is in a group.
                 * @param {endpointOptions | {}} options - The options for this endpoint.
                 * @returns {string} - Returns the created endpoint.
                 */
                getPlayerStat: (options = {}) => {
                    return this.getPlatformEndpoint(
                        this.formatEndpoint(keys.ENDPOINTS.GROUP_STAT, options.group, options.player, options.stat, options.board),
                        options.platform
                    )
                }
            },

            /**
             * Endpoints regarding leaderboards.
             */
            leaderboards: {

                /**
                 * Get all leaderboards available.
                 * @param {endpointOptions | {}} options - The options for this endpoint.
                 * @returns {string} - Returns the created endpoint.
                 */
                getAll: (options = {}) => {
                    return this.getPlatformEndpoint(
                        keys.ENDPOINTS.LEADERBOARDS,
                        options.platform
                    );
                },

                /**
                 * Get leaderboard by game name.
                 * @param {endpointOptions | {}} options - The options for this endpoint.
                 * @returns {string} - Returns the created endpoint.
                 */
                getGame: (options = {}) => {
                    return this.getPlatformEndpoint(
                        this.formatEndpoint(keys.ENDPOINTS.LEADERBOARD_GAME, options.game),
                        options.platform
                    );
                },

                /**
                 * Get leaderboard for a game stat.
                 * @param {endpointOptions | {}} options - The options for this endpoint.
                 * @returns {string} - Returns the created endpoint.
                 */
                getGameStat: (options = {}) => {
                    return this.getPlatformEndpoint(
                        this.formatEndpoint(keys.ENDPOINTS.LEADERBOARD_STAT, options.game, options.stat),
                        options.platform
                    );
                },

                /**
                 * Get leaderboard by game stat board specified.
                 * @param {endpointOptions | {}} options - The options for this endpoint.
                 * @returns {string} - Returns the created endpoint.
                 */
                getGameBoard: (options = {}) => {
                    return this.getPlatformEndpoint(
                        this.formatEndpoint(keys.ENDPOINTS.LEADERBOARD_STAT_BOARD, options.game, options.stat, options.board)
                    );
                },

                /**
                 * Get leaderboard saves.
                 * @param {endpointOptions | {}} options - The options for this endpoint.
                 * @returns {string} - Returns the created endpoint.
                 */
                getSaves: (options = {}) => {
                    return this.getPlatformEndpoint(
                        this.formatEndpoint(keys.ENDPOINTS.LEADERBOARD_SAVE, options.game, options.stat, options.board),
                        options
                    );
                },

                /**
                 * Get leaderboard save times.
                 * @param {endpointOptions | {}} options - The options for this endpoint.
                 * @returns {string} - Returns the created endpoint.
                 */
                getSaveTimes: (options = {}) => {
                    return this.getPlatformEndpoint(
                        this.formatEndpoint(keys.ENDPOINTS.LEADERBOARD_SAVE_TIMES, options.game, options.stat, options.board),
                        options.platform
                    );
                }
            },

            /**
             * Endpoints regarding players.
             */
            players: {

                /**
                 * Get a specific stat for a player.
                 * @param {endpointOptions | {}} options - The options for this endpoint.
                 * @returns {string} - Returns the created endpoint.
                 */
                getPlayerStat: (options = {}) => {
                    return this.getPlatformEndpoint(
                        this.formatEndpoint(keys.ENDPOINTS.PLAYER_STAT, options.player, options.stat, options.board),
                        options.platform
                    );
                },

                /**
                 * Get a specific game stat for a player.
                 * @param {endpointOptions | {}} options - The options for this endpoint.
                 * @returns {string} - Returns the created endpoint.
                 */
                getGameStat: (options = {}) => {
                    return this.getPlatformEndpoint(
                        this.formatEndpoint(keys.ENDPOINTS.PLAYER_GAME_STAT, options.player, options.game, options.board),
                        options.platform
                    );
                },

                /**
                 * Get a specific stat for a player by uuid.
                 * @param {endpointOptions | {}} options - The options for this endpoint.
                 * @returns {string} - Returns the created endpoint.
                 */
                getUUIDPlayerStat: (options = {}) => {
                    return this.getPlatformEndpoint(
                        this.formatEndpoint(keys.ENDPOINTS.PLAYER_UUID_STAT, options.uuid, options.stat, options.board),
                        options.platform
                    );
                },

                /**
                 * Get a specific game stat for a player by uuid.
                 * @param {endpointOptions | {}} options - The options for this endpoint.
                 * @returns {string} - Returns the created endpoint.
                 */
                getUUIDPLayerGameStat: (options = {}) => {
                    return this.getPlatformEndpoint(
                        this.formatEndpoint(keys.ENDPOINTS.PLAYER_UUID_STAT, options.uuid, options.game, options.board),
                        options.platform
                    );
                }
            },

            /**
             * Endpoints regarding stats.
             */
            stats: {

                /**
                 * Get all stats available.
                 * @param {endpointOptions | {}} options - The options for this endpoint.
                 * @returns {string} - Returns the created endpoint.
                 */
                getAll: (options = {}) => {
                  return this.getPlatformEndpoint(
                      keys.ENDPOINTS.STATS,
                      options.platform
                    );
                },

                /**
                 * Get a stat by name.
                 * @param {endpointOptions | {}} options - The options for this endpoint.
                 * @returns {string} - Returns the created endpoint.
                 */
                get: (options = {}) => {
                    return this.getPlatformEndpoint(
                        this.formatEndpoint(keys.ENDPOINTS.STAT, options.stat),
                        options.platform
                    );
                }
            },

            /**
             * Endpoints regarding website.
             */
            website: {
                /**
                 * Get player information from the website.
                 * @param {endpointOptions | {}} options - The options for this endpoint.
                 * @returns {string} - Returns the created endpoint.
                 */
                getPlayer: (options = {}) => {
                    return this.getPlatformEndpoint(
                        this.formatEndpoint(keys.ENDPOINTS.WEBSITE, options.player),
                        options.platform
                    );
                }
            }
        };
    }

    // --- API

    /**
     * Request board information using the given method.
     * @param {string} method - The method to request.
     * @param {endpointOptions | {}} options - The options to apply to the request.
     * @returns {Promise<{}>} - Returns the object fetched from the request.
     */
    boards = async (method, options= {}) => await this.callEndpoint('board', method, options);

    /**
     * Request filter information using the given method.
     * @param {string} method - The method to request.
     * @param {endpointOptions | {}} options - The options to apply to the request.
     * @returns {Promise<{}>} - Returns the object fetched from the request.
     */
    filters = async (method, options= {}) => await this.callEndpoint('filter', method, options);

    /**
     * Request game information using the given method.
     * @param {string} method - The method to request.
     * @param {endpointOptions | {}} options - The options to apply to the request.
     * @returns {Promise<{}>} - Returns the object fetched from the request.
     */
    games = async (method, options= {}) => await this.callEndpoint('games', method, options);

    /**
     * Request group information using the given method.
     * @param {string} method - The method to request.
     * @param {endpointOptions | {}} options - The options to apply to the request.
     * @returns {Promise<{}>} - Returns the object fetched from the request.
     */
    groups = async (method, options= {}) => await this.callEndpoint('group', method, options);

    /**
     * Request leaderboard information using the given method.
     * @param {string} method - The method to request.
     * @param {endpointOptions | {}} options - The options to apply to the request.
     * @returns {Promise<{}>} - Returns the object fetched from the request.
     */
    leaderboards = async (method, options= {}) => await this.callEndpoint('leaderboard', method, options);

    /**
     * Request player information using the given method.
     * @param {string} method - The method to request.
     * @param {endpointOptions | {}} options - The options to apply to the request.
     * @returns {Promise<{}>} - Returns the object fetched from the request.
     */
    players = async (method, options= {}) => await this.callEndpoint('player', method, options);

    /**
     * Request stat information using the given method.
     * @param {string} method - The method to request.
     * @param {endpointOptions | {}} options - The options to apply to the request.
     * @returns {Promise<{}>} - Returns the object fetched from the request.
     */
    stats = async (method, options= {}) => await this.callEndpoint('stats', method, options);

    /**
     * Request website information using the given method.
     * @param {string} method - The method to request.
     * @param {endpointOptions | {}} options - The options to apply to the request.
     * @returns {Promise<{}>} - Returns the object fetched from the request.
     */
    website = async (method, options= {}) => await this.callEndpoint('website', method, options);

    /**
     * Request a resource from the endpoint corresponding to the given type and method.
     * @param {string} type - The endpoint type.
     * @param {string} method - The method belonging to the endpoint type.
     * @param {endpointOptions | {}} options - Options required for the method.
     * @returns {Promise<Response> | {}} - Returns the response from the fetched Mineplex endpoint.
     */
    async callEndpoint(type = '', method = '', options = {})
    {
        // Validate the endpoint

        const endpointType = this.endpoints[type];

        if (!endpointType)
        {
            throw new Error(`Invalid endpoint type ${type}.`);
        }

        // Check that the method exists

        const endpointObject = endpointType[method];

        if (!endpointObject)
        {
            await this.#throwEndpointError(type, method);
        }

        const endpoint = endpointObject(options);
        return Mineplex.get(endpoint);
    }

    /**
     * Format the endpoint with the arguments required.
     * @param {string} endpoint - The endpoint url.
     * @param {string} args - The arguments the url needs.
     */
    formatEndpoint(endpoint, ...args)
    {
        const urlArgCount = endpoint.match('{').length;
        const argCount = args.length;

        // If the args specified are not equal to the length needed, something is wrong

        if (urlArgCount !== argCount)
        {
            throw new Error(`Invalid argument count (${argCount}) for endpoint url ${endpoint}.`);
        }

        // Replace each argument where required

        for (let i = 0; i < urlArgCount; i++)
        {
            const arg = args[i].replace(/ /g, '');
            endpoint = endpoint.replace('{' + i + '}', arg);
        }

        return endpoint;
    }

    /**
     * Get the full endpoint given the platform.
     * @param endpoint - The endpoint required.
     * @param platform - The platform the endpoint requires.
     * @returns {string} - Returns the full endpoint url containing the platform.
     */
    getPlatformEndpoint(endpoint, platform)
    {
        // If the platform is undefined an endpoint cannot be made

        if (!platform)
        {
            throw new Error(`Cannot create an endpoint from an undefined platform.`);
        }

        // Make sure there's a platform specified

        const platformEndpoint = keys.ENDPOINTS[platform.toUpperCase()];

        if (!platformEndpoint)
        {
            throw new Error(`Invalid or missing platform type ${platform} specified.`);
        }

        return platformEndpoint + endpoint;
    }

    /**
     * Error method for attempted method calls that do not exist.
     * @param {string} endpoint - The endpoint type.
     * @param {string} method - The method name.
     */
    #throwEndpointError(endpoint, method)
    {
        throw new Error(`Invalid endpoint provided. Endpoint ${endpoint} does not have method ${method}().`);
    }

    // --- Leaderboards

    /**
     * Get the leaderboards for wins in the given game.
     * @param {GAMES | String} game - The game mode.
     * @param {BOARDS | String} board - The leaderboard duration type.
     * @returns {Promise<null|Leaderboard>} - Returns the fetched leaderboard for wins.
     * Can return null if a leaderboard cannot be found for the given parameters.
     */
    async getWinLeaderboard(game, board)
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
    async getLeaderboard(game, stat, board)
    {
        return await Mineplex.getLeaderboard(game, stat, board);
    }
}

const stats = new Stats();

// Example call

// async function testAPICall()
// {
//     const a = await stats.games('get', {platform: keys.PLATFORMS.JAVA, game: keys.GAMES.SURVIVAL_GAMES});
//
//     return new Promise(async  resolve => {
//         console.log(await a.json());
//     });
// }
//
// testAPICall(); // Should return information on Survival Games

module.exports = stats;