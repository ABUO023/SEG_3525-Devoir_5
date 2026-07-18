export type PacePoint = {
  lap: number;
  time: number;
};

export type Driver = {
  number: number;
  name: string;
  shortName: string;
  team: string;
  teamColor: string;
  bestLap: number;
  bestLapNumber: number;
  averageLap: number;
  topSpeed: number;
  pace: PacePoint[];
};

export const drivers: Driver[] = [
  {
    number: 16,
    name: "Charles Leclerc",
    shortName: "LEC",
    team: "Ferrari",
    teamColor: "#ed1131",
    bestLap: 86.725,
    bestLapNumber: 45,
    averageLap: 88.8,
    topSpeed: 330,
    pace: [
      { lap: 5, time: 90.062 },
      { lap: 10, time: 89.63 },
      { lap: 15, time: 89.998 },
      { lap: 20, time: 89.256 },
      { lap: 25, time: 88.171 },
      { lap: 30, time: 88.471 },
      { lap: 35, time: 88.453 },
      { lap: 45, time: 86.725 },
      { lap: 50, time: 87.213 },
      { lap: 55, time: 88.195 },
      { lap: 58, time: 88.273 },
    ],
  },
  {
    number: 81,
    name: "Oscar Piastri",
    shortName: "PIA",
    team: "McLaren",
    teamColor: "#f47600",
    bestLap: 86.765,
    bestLapNumber: 44,
    averageLap: 88.981,
    topSpeed: 315,
    pace: [
      { lap: 5, time: 89.758 },
      { lap: 10, time: 89.468 },
      { lap: 15, time: 89.536 },
      { lap: 20, time: 89.892 },
      { lap: 25, time: 89.261 },
      { lap: 30, time: 89.119 },
      { lap: 35, time: 89.177 },
      { lap: 40, time: 89.388 },
      { lap: 45, time: 87.392 },
      { lap: 50, time: 87.039 },
      { lap: 55, time: 87.79 },
      { lap: 58, time: 88.074 },
    ],
  },
  {
    number: 4,
    name: "Lando Norris",
    shortName: "NOR",
    team: "McLaren",
    teamColor: "#f47600",
    bestLap: 86.818,
    bestLapNumber: 48,
    averageLap: 88.678,
    topSpeed: 324,
    pace: [
      { lap: 5, time: 89.818 },
      { lap: 10, time: 89.635 },
      { lap: 15, time: 89.59 },
      { lap: 20, time: 89.528 },
      { lap: 25, time: 88.355 },
      { lap: 30, time: 88.066 },
      { lap: 35, time: 87.971 },
      { lap: 40, time: 90.069 },
      { lap: 45, time: 86.953 },
      { lap: 50, time: 86.968 },
      { lap: 55, time: 87.975 },
      { lap: 58, time: 88.987 },
    ],
  },
  {
    number: 27,
    name: "Nico Hülkenberg",
    shortName: "HUL",
    team: "Kick Sauber",
    teamColor: "#01a90d",
    bestLap: 87.05,
    bestLapNumber: 46,
    averageLap: 89.839,
    topSpeed: 340,
    pace: [
      { lap: 5, time: 90.776 },
      { lap: 10, time: 89.003 },
      { lap: 15, time: 89.488 },
      { lap: 20, time: 90.485 },
      { lap: 25, time: 90.113 },
      { lap: 30, time: 90.519 },
      { lap: 35, time: 89.611 },
      { lap: 40, time: 89.96 },
      { lap: 45, time: 87.574 },
      { lap: 50, time: 87.977 },
      { lap: 55, time: 88.053 },
      { lap: 58, time: 88.107 },
    ],
  },
  {
    number: 1,
    name: "Max Verstappen",
    shortName: "VER",
    team: "Red Bull Racing",
    teamColor: "#4781d7",
    bestLap: 87.625,
    bestLapNumber: 39,
    averageLap: 88.752,
    topSpeed: 335,
    pace: [
      { lap: 5, time: 89.695 },
      { lap: 10, time: 89.465 },
      { lap: 15, time: 89.703 },
      { lap: 20, time: 89.557 },
      { lap: 25, time: 88.693 },
      { lap: 30, time: 88.049 },
      { lap: 35, time: 87.981 },
      { lap: 40, time: 88.142 },
      { lap: 45, time: 87.752 },
      { lap: 50, time: 87.986 },
      { lap: 55, time: 88.817 },
      { lap: 58, time: 88.473 },
    ],
  },
  {
    number: 18,
    name: "Lance Stroll",
    shortName: "STR",
    team: "Aston Martin",
    teamColor: "#178c67",
    bestLap: 87.626,
    bestLapNumber: 52,
    averageLap: 90.063,
    topSpeed: 345,
    pace: [
      { lap: 5, time: 90.458 },
      { lap: 10, time: 90.275 },
      { lap: 15, time: 90.931 },
      { lap: 20, time: 91.779 },
      { lap: 25, time: 89.854 },
      { lap: 30, time: 90.175 },
      { lap: 35, time: 90.004 },
      { lap: 40, time: 90.278 },
      { lap: 45, time: 88.113 },
      { lap: 50, time: 88.065 },
      { lap: 55, time: 88.046 },
      { lap: 58, time: 89.029 },
    ],
  },
  {
    number: 43,
    name: "Franco Colapinto",
    shortName: "COL",
    team: "Alpine",
    teamColor: "#00a1e8",
    bestLap: 87.71,
    bestLapNumber: 42,
    averageLap: 90.187,
    topSpeed: 315,
    pace: [
      { lap: 5, time: 90.99 },
      { lap: 10, time: 90.837 },
      { lap: 15, time: 92.799 },
      { lap: 20, time: 89.699 },
      { lap: 25, time: 90.138 },
      { lap: 30, time: 89.674 },
      { lap: 35, time: 90.63 },
      { lap: 40, time: 93.034 },
      { lap: 45, time: 88.464 },
      { lap: 50, time: 88.494 },
      { lap: 55, time: 88.57 },
    ],
  },
  {
    number: 10,
    name: "Pierre Gasly",
    shortName: "GAS",
    team: "Alpine",
    teamColor: "#00a1e8",
    bestLap: 87.767,
    bestLapNumber: 46,
    averageLap: 90.052,
    topSpeed: 332,
    pace: [
      { lap: 5, time: 90.908 },
      { lap: 10, time: 90.586 },
      { lap: 15, time: 89.817 },
      { lap: 20, time: 89.911 },
      { lap: 25, time: 89.715 },
      { lap: 30, time: 89.955 },
      { lap: 35, time: 90.115 },
      { lap: 40, time: 91.907 },
      { lap: 45, time: 88.047 },
      { lap: 50, time: 87.992 },
      { lap: 55, time: 89.233 },
    ],
  },
];

type LocalizedText = {
  en: string;
  fr: string;
};

export type Race = {
  slug: string;
  key: number;
  round: number;
  date: string;
  laps: number;
  image: string;
  label: LocalizedText;
  name: LocalizedText;
  circuit: LocalizedText;
  mapCredit: string;
  mapUrl: string;
  license: string;
  licenseUrl: string;
  drivers: Driver[];
};

function makeDriver(
  number: number,
  name: string,
  shortName: string,
  team: string,
  teamColor: string,
  bestLap: number,
  bestLapNumber: number,
  averageLap: number,
  topSpeed: number,
  pace: Array<[number, number]> = [],
): Driver {
  return {
    number,
    name,
    shortName,
    team,
    teamColor,
    bestLap,
    bestLapNumber,
    averageLap,
    topSpeed,
    pace: pace.map(([lap, time]) => ({ lap, time })),
  };
}

const monacoDrivers = [
  makeDriver(4, "Lando Norris", "NOR", "McLaren", "#f47600", 73.221, 78, 77.342, 286, [
    [5, 78.05], [10, 80.385], [15, 75.673], [25, 74.4], [30, 77.259], [35, 74.184],
    [40, 75.237], [45, 74.384], [50, 90.893], [55, 74.993], [60, 75.584], [65, 75.478],
    [70, 76.238], [75, 76.405], [78, 73.221],
  ]),
  makeDriver(63, "George Russell", "RUS", "Mercedes", "#00d7b6", 73.405, 74, 79.442, 284, [
    [5, 80.576], [10, 81.501], [15, 79.764], [20, 78.513], [25, 79.216], [30, 80.514],
    [35, 79.219], [40, 78.936], [45, 79.192], [50, 75.966], [55, 76.455], [60, 76.207],
    [65, 74.28], [70, 74.303], [75, 73.773],
  ]),
  makeDriver(12, "Kimi Antonelli", "ANT", "Mercedes", "#00d7b6", 73.518, 74, 80.177, 283, [
    [5, 80.377], [10, 81.523], [15, 79.858], [20, 78.842], [25, 78.777], [30, 80.406],
    [35, 79.458], [40, 78.95], [45, 79.251], [50, 79.093], [55, 78.966], [60, 78.697],
    [65, 77.696], [75, 74.834],
  ]),
  makeDriver(81, "Oscar Piastri", "PIA", "McLaren", "#f47600", 73.745, 60, 77.388, 287, [
    [5, 80.048], [10, 79.16], [15, 75.522], [20, 93.72], [25, 74.94], [30, 74.868],
    [35, 74.819], [40, 74.344], [45, 75.124], [50, 74.121], [55, 76.244], [60, 73.745],
    [65, 74.661], [70, 75.899], [75, 76.139], [78, 75.02],
  ]),
  makeDriver(55, "Carlos Sainz", "SAI", "Williams", "#1868db", 73.988, 68, 79.154, 281),
  makeDriver(16, "Charles Leclerc", "LEC", "Ferrari", "#ed1131", 74.055, 36, 77.371, 286),
  makeDriver(44, "Lewis Hamilton", "HAM", "Ferrari", "#ed1131", 74.09, 73, 77.529, 285),
  makeDriver(1, "Max Verstappen", "VER", "Red Bull Racing", "#4781d7", 74.23, 45, 77.611, 284),
];

const silverstoneDrivers = [
  makeDriver(81, "Oscar Piastri", "PIA", "McLaren", "#f47600", 89.337, 51, 100.03, 318, [
    [5, 104.455], [10, 104.89], [25, 101.581], [30, 102.887], [35, 101.091],
    [40, 99.461], [45, 94.87], [50, 89.686], [52, 92.34],
  ]),
  makeDriver(4, "Lando Norris", "NOR", "McLaren", "#f47600", 89.734, 48, 100.326, 313, [
    [5, 105.033], [10, 105.857], [25, 102.017], [30, 102.403], [35, 101.103],
    [40, 99.286], [50, 89.921], [52, 90.69],
  ]),
  makeDriver(44, "Lewis Hamilton", "HAM", "Ferrari", "#ed1131", 90.016, 49, 100.831, 323, [
    [5, 107.677], [10, 108.242], [25, 103.72], [30, 103.57], [35, 101.444],
    [40, 100.697], [45, 93.938], [50, 90.775], [52, 91.662],
  ]),
  makeDriver(23, "Alexander Albon", "ALB", "Williams", "#1868db", 90.047, 50, 101.183, 331, [
    [10, 109.218], [25, 104.01], [30, 104.618], [35, 105.664], [40, 102.225],
    [45, 94.663], [50, 90.047], [52, 90.452],
  ]),
  makeDriver(1, "Max Verstappen", "VER", "Red Bull Racing", "#4781d7", 90.179, 49, 100.717, 330),
  makeDriver(14, "Fernando Alonso", "ALO", "Aston Martin", "#229971", 90.353, 49, 101.136, 335),
  makeDriver(55, "Carlos Sainz", "SAI", "Williams", "#1868db", 90.645, 52, 101.55, 324),
  makeDriver(10, "Pierre Gasly", "GAS", "Alpine", "#00a1e8", 90.751, 48, 101.748, 334),
];

const monzaDrivers = [
  makeDriver(4, "Lando Norris", "NOR", "McLaren", "#f47600", 80.901, 53, 83.058, 340, [
    [5, 84.238], [10, 83.416], [15, 83.059], [20, 83.049], [25, 83.082], [30, 82.639],
    [35, 82.647], [40, 82.621], [45, 82.781], [50, 81.123], [53, 80.901],
  ]),
  makeDriver(1, "Max Verstappen", "VER", "Red Bull Racing", "#4781d7", 81.003, 52, 82.737, 352, [
    [5, 83.588], [10, 83.088], [15, 83.077], [20, 82.857], [25, 82.97], [30, 82.928],
    [35, 82.651], [40, 81.625], [45, 81.353], [50, 81.297], [53, 81.1],
  ]),
  makeDriver(81, "Oscar Piastri", "PIA", "McLaren", "#f47600", 81.245, 47, 83.165, 353, [
    [5, 84.358], [10, 83.461], [15, 83.385], [20, 83.225], [25, 83.27], [30, 82.92],
    [35, 82.588], [40, 82.296], [45, 86.609], [50, 81.508], [53, 81.371],
  ]),
  makeDriver(16, "Charles Leclerc", "LEC", "Ferrari", "#ed1131", 81.294, 53, 83.219, 352, [
    [5, 84.441], [10, 84.14], [15, 83.635], [20, 83.49], [25, 83.111], [30, 82.972],
    [35, 82.17], [40, 82.298], [45, 81.673], [50, 81.575], [53, 81.294],
  ]),
  makeDriver(23, "Alexander Albon", "ALB", "Williams", "#1868db", 81.368, 53, 83.701, 364),
  makeDriver(44, "Lewis Hamilton", "HAM", "Ferrari", "#ed1131", 81.546, 50, 83.448, 363),
  makeDriver(55, "Carlos Sainz", "SAI", "Williams", "#1868db", 81.74, 47, 83.95, 358),
  makeDriver(63, "George Russell", "RUS", "Mercedes", "#00d7b6", 81.8, 45, 83.335, 344),
];

export const races: Race[] = [
  {
    slug: "abu-dhabi",
    key: 9839,
    round: 24,
    date: "2025-12-07T13:00:00Z",
    laps: 58,
    image: "/yas.webp",
    label: { en: "Abu Dhabi", fr: "Abou Dabi" },
    name: { en: "Abu Dhabi Grand Prix", fr: "Grand Prix d'Abou Dabi" },
    circuit: { en: "Yas Marina Circuit", fr: "Circuit de Yas Marina" },
    mapCredit: "User-provided asset",
    mapUrl: "https://en.wikipedia.org/wiki/Yas_Marina_Circuit",
    license: "Circuit reference",
    licenseUrl: "https://en.wikipedia.org/wiki/Yas_Marina_Circuit",
    drivers,
  },
  {
    slug: "monaco",
    key: 9979,
    round: 8,
    date: "2025-05-25T13:00:00Z",
    laps: 78,
    image: "/monaco.webp",
    label: { en: "Monaco", fr: "Monaco" },
    name: { en: "Monaco Grand Prix", fr: "Grand Prix de Monaco" },
    circuit: { en: "Circuit de Monaco", fr: "Circuit de Monaco" },
    mapCredit: "Will Pittenger",
    mapUrl: "https://commons.wikimedia.org/wiki/File:Monte_Carlo_Formula_1_track_map.svg",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    drivers: monacoDrivers,
  },
  {
    slug: "silverstone",
    key: 9947,
    round: 12,
    date: "2025-07-06T14:00:00Z",
    laps: 52,
    image: "/silverstone.webp",
    label: { en: "Silverstone", fr: "Silverstone" },
    name: { en: "British Grand Prix", fr: "Grand Prix de Grande-Bretagne" },
    circuit: { en: "Silverstone Circuit", fr: "Circuit de Silverstone" },
    mapCredit: "Antoine266",
    mapUrl: "https://commons.wikimedia.org/wiki/File:Silverstone_Circuit_2020.png",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    drivers: silverstoneDrivers,
  },
  {
    slug: "monza",
    key: 9912,
    round: 16,
    date: "2025-09-07T13:00:00Z",
    laps: 53,
    image: "/monza.webp",
    label: { en: "Monza", fr: "Monza" },
    name: { en: "Italian Grand Prix", fr: "Grand Prix d'Italie" },
    circuit: { en: "Monza Circuit", fr: "Circuit de Monza" },
    mapCredit: "Will Pittenger",
    mapUrl: "https://commons.wikimedia.org/wiki/File:Monza_track_map.svg",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    drivers: monzaDrivers,
  },
];
