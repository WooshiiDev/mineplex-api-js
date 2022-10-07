// noinspection JSUnusedGlobalSymbols

const keys = require("./api/mp-keys");
const {Mineplex} = require("./api/mp-fetch");

const endpointOptions = {
    board: undefined,
    category: undefined,
    game : undefined,
    group: undefined,
    platform: undefined,
    player: undefined,
    stat: undefined,
    uuid: undefined,
}

class Stats {
    constructor() {
        this.endpoints =
        {
            boards:{
                getAll: (options = {}) => {
                    return this.getPlatformEndpoint(
                        keys.ENDPOINTS.BOARDS,
                        options.platform
                    );
                },
                get: (options = {}) => {
                    return this.getPlatformEndpoint(
                        this.formatURL(keys.ENDPOINTS.BOARD, options.board),
                        options.platform
                    );
                }
            },
            filters: {
                getAll: (options = {}) => {
                    return this.getPlatformEndpoint(
                        keys.ENDPOINTS.FILTERS,
                        options.platform
                    );
                },
                getAllReasons: (options = {}) => {
                    return this.getPlatformEndpoint(
                        keys.ENDPOINTS.FILTER_REASONS,
                        options.platform
                    );
                }
            },
            games: {
                getAll: (options = {}) => {
                    return this.getPlatformEndpoint(
                        keys.ENDPOINTS.GAMES,
                        options.platform
                    );
                },
                get: (options = {}) => {
                    return this.getPlatformEndpoint(
                        this.formatURL(keys.ENDPOINTS.GAME, options.game),
                        options.platform
                    );
                },
                getAllCategories: (options = {}) => {
                    return this.getPlatformEndpoint(
                        keys.ENDPOINTS.GAME_CATEGORIES,
                        options.platform
                    );
                },
                getCategory: (options = {}) => {
                    return this.getPlatformEndpoint(
                        this.formatURL(keys.ENDPOINTS.GAME_CATEGORY, options.category),
                        options.platform
                    );
                }
            },
            groups: {
                getAll: (options = {}) => {
                    return this.getPlatformEndpoint(
                        keys.ENDPOINTS.GROUPS,
                        options.platform
                    );
                },
                get: (options = {}) => {
                    return this.getPlatformEndpoint(
                        this.formatURL(keys.ENDPOINTS.GROUP, options.group),
                        options.platform
                    );
                },
                getPlayerStat: (options = {}) => {
                    return this.getPlatformEndpoint(
                        this.formatURL(keys.ENDPOINTS.GROUP_STAT, options.group, options.player, options.stat, options.board),
                        options.platform
                    )
                }
            },
            leaderboards: {
                getAll: (options = {}) => {
                    return this.getPlatformEndpoint(
                        keys.ENDPOINTS.LEADERBOARDS,
                        options.platform
                    );
                },
                getGame: (options = {}) => {
                    return this.getPlatformEndpoint(
                        this.formatURL(keys.ENDPOINTS.LEADERBOARD_GAME, options.game),
                        options.platform
                    );
                },
                getGameStat: (options = {}) => {
                    return this.getPlatformEndpoint(
                        this.formatURL(keys.ENDPOINTS.LEADERBOARD_STAT, options.game, options.stat),
                        options.platform
                    );
                },
                getGameBoard: (options = {}) => {
                    return this.getPlatformEndpoint(
                        this.formatURL(keys.ENDPOINTS.LEADERBOARD_STAT_BOARD, options.game, options.stat, options.board)
                    );
                },
                getSaves: (options = {}) => {
                    return this.getPlatformEndpoint(
                        this.formatURL(keys.ENDPOINTS.LEADERBOARD_SAVE, options.game, options.stat, options.board),
                        options
                    );
                },
                getSaveTimes: (options = {}) => {
                    return this.getPlatformEndpoint(
                        this.formatURL(keys.ENDPOINTS.LEADERBOARD_SAVE_TIMES, options.game, options.stat, options.board),
                        options.platform
                    );
                }
            },
            players: {
                getPlayerStat: (options = {}) => {
                    return this.getPlatformEndpoint(
                        this.formatURL(keys.ENDPOINTS.PLAYER_STAT, options.player, options.stat, options.board),
                        options.platform
                    );
                },
                getGameStat: (options = {}) => {
                    return this.getPlatformEndpoint(
                        this.formatURL(keys.ENDPOINTS.PLAYER_GAME_STAT, options.player, options.game, options.board),
                        options.platform
                    );
                },
                getUUIDPlayerStat: (options = {}) => {
                    return this.getPlatformEndpoint(
                        this.formatURL(keys.ENDPOINTS.PLAYER_UUID_STAT, options.uuid, options.stat, options.board),
                        options.platform
                    );
                },
                getUUIDPLayerGameStat: (options = {}) => {
                    return this.getPlatformEndpoint(
                        this.formatURL(keys.ENDPOINTS.PLAYER_UUID_STAT, options.uuid, options.game, options.board),
                        options.platform
                    );
                }
            },
            stats: {
                getAll: (options = {}) => {
                  return this.getPlatformEndpoint(
                      keys.ENDPOINTS.STATS,
                      options.platform
                    );
                },
                get: (options = {}) => {
                    return this.getPlatformEndpoint(
                        this.formatURL(keys.ENDPOINTS.STAT, options.stat),
                        options.platform
                    );
                }
            },
            website: {
                getPlayer: (options = {}) => {
                    return this.getPlatformEndpoint(
                        this.formatURL(keys.ENDPOINTS.WEBSITE, options.player),
                        options.platform
                    );
                }
            }
        };
    }

    // --- API

    boards = async (method, options) => await this.callEndpoint('board', method, options);
    filters = async (method, options) => await this.callEndpoint('filter', method, options);
    games = async (method, options) => await this.callEndpoint('games', method, options);
    groups = async (method, options) => await this.callEndpoint('group', method, options);
    leaderboards = async (method, options) => await this.callEndpoint('leaderboard', method, options);
    players = async (method, options) => await this.callEndpoint('player', method, options);
    stats = async (method, options) => await this.callEndpoint('stats', method, options);
    website = async (method, options) => await this.callEndpoint('website', method, options);

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
            await this.throwEndpointError(type, method);
        }

        const endpoint = endpointObject(options);
        return Mineplex.get(endpoint);
    }

    /**
     *
     * @param {string} url
     * @param {string} args
     */
    formatURL(url, ...args)
    {
        const urlArgCount = url.match('{').length;
        const argCount = args.length;

        if (urlArgCount !== argCount)
        {
            throw new Error(`Invalid argument count (${argCount}) for endpoint url ${url}.`);
        }

        for (let i = 0; i < urlArgCount; i++)
        {
            const arg = args[i].replace(/ /g, '');
            url = url.replace('{' + i + '}', arg);
        }

        return url;
    }

    getPlatformEndpoint(endpoint, platform)
    {
        // Make sure there's a platform specified

        const platformEndpoint = keys.ENDPOINTS[platform.toUpperCase()];

        if (!platformEndpoint)
        {
            throw new Error(`Invalid or missing platform type ${platform} specified.`);
        }

        return platformEndpoint + endpoint;
    }

    async throwEndpointError(endpoint, method)
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

// async function testAPICall()
// {
//     const a = await stats.games('get', {platform: keys.PLATFORMS.JAVA, game: keys.GAMES.SURVIVAL_GAMES});
//
//     return new Promise(async  resolve => {
//         console.log(await a.json());
//     });
// }
//
// testAPICall();

module.exports = stats;