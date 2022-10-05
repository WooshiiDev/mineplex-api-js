const Mineplex = require('./api/mp-fetch');

export class Request
{
    // Leaderboards

    /**
     * Get the leaderboards for wins in the given game.
     * @param {LB_GAMES | String} game - The game mode.
     * @param {BOARDS | String} board - The leaderboard duration type.
     * @returns {Promise<null|Leaderboard>}
     */
    async GetWinLeaderboard(game, board)
    {
        return await Mineplex.GetLeaderboard(game, "Wins", board);
    }

    /**
     * Get the leaderboards for a particular stat in the given game.
     * @param {LB_GAMES | String} game - The game mode.
     * @param {String} stat - The stat the leaderboard is for.
     * @param {BOARDS | String} board - The leaderboard duration type.
     * @returns {Promise<null|Leaderboard>}
     */
    async GetLeaderboard(game, stat, board)
    {
        return await Mineplex.GetLeaderboard(game, stat, board);
    }
}