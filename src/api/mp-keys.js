const PLATFORMS =
{
    JAVA: 'JAVA',
    BEDROCK: 'BEDROCK'
}

const GAMES =
{
    A_BARBARIANS_LIFE : "A Barbarians Life",
    ALIEN_INVASION : "Alien Invasion",
    AREA51_RAID : "Area 51 Raid",
    BACON_BRAWL : "Bacon Brawl",
    BATTLE_ROYALE : "Battle Royale",
    BAWK_BAWK_BATTLES : "Bawk Bawk Battles",
    BLOCK_HUNT : "Block Hunt",
    BOMB_LOBBERS : "Bomb Lobbers",
    BOSS_BATTLES : "Boss Battles",
    BOUNCY_BALLS : "Bouncy Balls",
    BRAWL : "Brawl",
    BUILD_WARS : "Build Wars",
    CAKE_WARS_DUOS : "Cake Wars Duos",
    CAKE_WARS_STANDARD : "Cake Wars Standard",
    CANVAS_WARFARE : "Canvas Warfare",
    CASTLE_ASSAULT : "Castle Assault",
    CASTLE_ASSAULT_TDM : "Castle Assault TDM",
    CASTLE_SIEGE : "Castle Siege",
    CHAMPIONS_CTF : "Champions CTF",
    CHAMPIONS_DOMINATION : "Champions Domination",
    CHAMPIONS_TDM : "Champions TDM",
    CHEST : "Chest",
    CHRISTMAS_CHAOS : "Christmas Chaos",
    CHRISTMAS_CHAOS_II : "Christmas Chaos II",
    CLANS : "Clans",
    CLIMB_TIME : "Climb Time",
    COMPETITIVE1 : "Competitive1",
    CRAFT_AGAINST_HUMANITY : "Craft Against Humanity",
    DEATH_RUN : "Death Run",
    DEATH_TAG : "Death Tag",
    DRAGON_ESCAPE : "Dragon Escape",
    DRAGON_ESCAPE_TEAMS : "Dragon Escape Teams",
    DRAGON_RIDERS : "Dragon Riders",
    DRAGONS : "Dragons",
    DRAGONS_TEAMS : "Dragons Teams",
    DRAW_MY_THING : "Draw My Thing",
    DUCK_HUNT : "Duck Hunt",
    DUCK_STOMPERS : "Duck Stompers",
    ENDURANCE : "Endurance",
    EVOLUTION : "Evolution",
    GEM_HUNTERS : "Gem Hunters",
    GEM_WARS : "Gem Wars",
    GLADIATOR_ARENA : "Gladiator Arena",
    GLADIATORS : "Gladiators",
    GLOBAL : "Global",
    GRAVITY : "Gravity",
    HALLOWEEN_HAVOC : "Halloween Havoc",
    HALLOWEEN_HAVOC_OLD : "Halloween Havoc Old",
    HALLOWEEN_HORROR : "Halloween Horror",
    HEROES_OF_GWEN : "Heroes of GWEN",
    HEROES_OF_GWEN_TRAINING : "Heroes of GWEN Training",
    HOLE_IN_THE_WALL : "Hole In The Wall",
    HOOPS : "Hoops",
    HORSEBACK : "Horseback",
    JUGGERNAUT : "Juggernaut",
    KING_OF_THE_HILL : "King Of The Hill",
    LASER_TAG : "Laser Tag",
    MC_LEAGUE : "MC League",
    MASTER_BUILDERS : "Master Builders",
    MAVERICKS_MASTER_BUILDERS : "Mavericks Master Builders",
    MICRO_BATTLE : "Micro Battle",
    MILK_THE_COW : "Milk the Cow",
    MINE_STRIKE : "Mine Strike",
    MINE_WARE : "Mine Ware",
    MINEPLEX_EVENT : "Mineplex Event",
    MISSILE_WARS : "Missile Wars",
    MISSIONS : "Missions",
    MONSTER_LEAGUE : "Monster League",
    MONSTER_MAZE : "Monster Maze",
    NANO_GAMES : "Nano Games",
    ONE_IN_THE_QUIVER_TEAMS : "One In The Quiver Teams",
    ONE_IN_THE_QUIVER : "One in the Quiver",
    ONE_IN_THE_QUIVER_PAYLOAD : "One in the Quiver Payload",
    PLEX_QUEST : "Plex Quest",
    ROCKET_MADNESS : "Rocket Madness",
    ROSE_RUSH : "Rose Rush",
    RUNNER : "Runner",
    SCARY_VILLAGE : "Scary Village",
    SEARCH_AND_DESTROY : "Search and Destroy",
    SHEEP_QUEST : "Sheep Quest",
    SKYFALL : "Skyfall",
    SKYFALL_TEAMS : "Skyfall Teams",
    SKYWARS : "Skywars",
    SKYWARS_TEAMS : "Skywars Teams",
    SLIME_SUCKERS : "Slime Suckers",
    SNAKE : "Snake",
    SNEAKY_ASSASSINS : "Sneaky Assassins",
    SNOW_FIGHT : "Snow Fight",
    SNOW_SPRINT : "Snow Sprint",
    SPACE_WARS : "Space Wars",
    SPEED_BUILDERS : "Speed Builders",
    SQUID_SHOOTER : "Squid Shooter",
    STARFIGHTERS : "Starfighters",
    STOMPING_NAUGHTY_DUCKS : "Stomping Naughty Ducks",
    STRIKE_GAMES : "Strike Games",
    SUPER_PAINTBALL : "Super Paintball",
    SUPER_SMASH_MOBS : "Super Smash Mobs",
    SUPER_SMASH_MOBS_DOMINATION : "Super Smash Mobs Domination",
    SUPER_SMASH_MOBS_TEAMS : "Super Smash Mobs Teams",
    SUPER_SMASH_MOBS_TRAINING : "Super Smash Mobs Training",
    SUPER_SPLEEF : "Super Spleef",
    SUPER_SPLEEF_TEAMS : "Super Spleef Teams",
    SUPER_STACKER : "Super Stacker",
    SURVIVAL_GAMES : "Survival Games",
    SURVIVAL_GAMES_TEAMS : "Survival Games Teams",
    THE_BRIDGES : "The Bridges",
    TRACK : "Track",
    TUG_OF_WOOL : "Tug of Wool",
    TURF_WARS : "Turf Wars",
    TYPE_WARS : "Type Wars",
    UHC_REMASTERED : "UHC Remastered",
    ULTRA_HARDCORE : "Ultra Hardcore",
    ULTRA_HARDCORE_SOLO : "Ultra Hardcore Solo",
    ULTRA_HARDCORE_SOLO_SPEED : "Ultra Hardcore Solo Speed",
    ULTRA_HARDCORE_TEAMS_SPEED : "Ultra Hardcore Teams Speed",
    VALENTINES_VENDETTA : "Valentines Vendetta",
    WITHER_ASSAULT : "Wither Assault",
    WITHER_BRAWL : "Wither Brawl",
    WIZARDS : "Wizards",
    ZOMBIE_SURVIVAL : "Zombie Survival"
}

const BOARDS =
{
    ALL_TIME : "All",
    YEARLY : "Yearly",
    MONTHLY : "Monthly",
    WEEKLY : "Weekly",
    DAILY : "Daily"
}

const ENDPOINTS =
{
    // --- Base

    BEDROCK: 'v1/bedrock',
    JAVA: 'v1/java',

    // --- Boards

    BOARDS: '/board',
    BOARD: '/board/{0}',

    // --- Filter

    FILTERS: '/filter',
    FILTER_REASONS: '/filter/reasons',

    // --- Games

    GAMES: '/game',
    GAME: '/game/{0}',

    GAME_CATEGORIES: '/game/category',
    GAME_CATEGORY: '/game/category/{0}',

    // --- Group

    GROUPS: '/group/',
    GROUP: '/group/{0}',

    GROUP_STAT: '/group/{0}/stat/player/{1}/{2}/{3}',

    // --- Leaderboard

    LEADERBOARDS: '/leaderboard',

    LEADERBOARD_GAME: '/leaderboard/{0}',
    LEADERBOARD_STAT: '/leaderboard/{0}/{1}',

    LEADERBOARD_STAT_BOARD: '/leaderboard/{0}/{1}/{2}',

    LEADERBOARD_SAVE: '/leaderboard/{0}/{1}{2}/save',
    LEADERBOARD_SAVE_TIMES: '/leaderboard/{0}/{1}/{2}/saves',

    // --- Player

    PLAYER_STAT: 'player/{0}/stats/stat/{1}/{2}',
    PLAYER_GAME_STAT: 'player/{0}/stats/game/{1}/{2}',

    PLAYER_UUID_STAT: 'player/uuid/{0}/stats/stat/{1}/{2}',
    PLAYER_UUID_GAME_STAT: 'player/uuid/{0}/stats/game/{1}/{2}',

    // --- Stats

    STATS: '/stat',
    STAT: '/stat/{0}',

    // --- Website

    WEBSITE: '/website/{0}'
}

module.exports =
{
    BOARDS,
    ENDPOINTS,
    GAMES,
    PLATFORMS
}