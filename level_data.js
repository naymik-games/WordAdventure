groups = [
  { id: 0, title: 'Colors', puzzleCount: 5, levelStart: 0 },
  { id: 1, title: 'Nature', puzzleCount: 5, levelStart: 5 },
  { id: 2, title: 'Places', puzzleCount: 5, levelStart: 10 },
  { id: 3, title: 'Star Wars', puzzleCount: 5, levelStart: 15 },
  { id: 4, title: 'LOTR', puzzleCount: 5, levelStart: 20 },
  { id: 5, title: 'Computers', puzzleCount: 5, levelStart: 25 },
  { id: 6, title: 'Animals', puzzleCount: 5, levelStart: 30 }

];
//sizes
// 7x9
// 10x13
levels = [
  { level: 0, key: 'white', theme: 'Something White', orient: 2, size: { cols: 7, rows: 9 }, overlap: true, words: ["cloud", "ivory", "snow", "tooth", "vanilla"] },
  { level: 1, key: 'red', theme: 'Something Red', orient: 1, size: { cols: 7, rows: 9 }, overlap: false, words: ["nose", "apple", "devil", "lips", "rover", "scare", "brick"] },
  { level: 2, key: 'black', theme: 'Something Black', orient: 1, size: { cols: 7, rows: 9 }, overlap: true, words: ["coal", "night", "tuxedo", "spider"] },
  { level: 3, key: 'green', theme: 'Something Green', orient: 0, size: { cols: 7, rows: 9 }, overlap: true, words: ["leaves", "eyes", "alligator", "envy", "light"] },
  { level: 4, key: 'multi', theme: 'Multi-Colored', orient: 1, size: { cols: 7, rows: 9 }, overlap: false, words: ["rainbow", "people", "flowers", "prism"] },

  { level: 5, key: 'forest', theme: 'In The Forest', orient: 0, size: { cols: 7, rows: 9 }, overlap: false, words: ["ferns", "canopy", "redwood", "owls", "trails"] },
  { level: 6, key: 'problem', theme: 'Green Problems', orient: 0, size: { cols: 7, rows: 9 }, overlap: true, words: ["pollution", "extinct", "warming", "plastics"] },
  { level: 7, key: 'todo', theme: 'Things To Do', orient: 0, size: { cols: 7, rows: 9 }, overlap: false, words: ["camping", "climb", "cycle", "hike", "run", "sail"] },
  { level: 8, key: 'solution', theme: 'Green Solutions', size: { cols: 7, rows: 9 }, orient: 1, overlap: false, words: ["organic", "recycle", "reduce", "renewable", "reuse"] },
  { level: 9, key: 'water', theme: 'In the Water', orient: 1, size: { cols: 7, rows: 9 }, overlap: false, words: ["boats", "fish", "rocks", "seaweed", "trash", "whales"] },

  { level: 10, key: 'learn', theme: 'To Learn', orient: 0, size: { cols: 7, rows: 9 }, overlap: false, words: ["library", "museum", "school", "zoo"] },
  { level: 11, key: 'fun', theme: 'Have Fun', orient: 0, size: { cols: 7, rows: 9 }, overlap: false, words: ["beach", "nightclub", "park", "pool"] },
  { level: 12, key: 'serious', theme: 'Serious Face', orient: 0, size: { cols: 7, rows: 9 }, overlap: false, words: ["cemetery", "church", "court", "funeral"] },
  { level: 13, key: 'work', theme: 'Work, Work, Work', orient: 0, size: { cols: 7, rows: 9 }, overlap: false, words: ["diner", "home", "office", "shop", "store"] },
  { level: 14, key: 'live', theme: 'To Live', orient: 0, size: { cols: 7, rows: 9 }, overlap: false, words: ["apartment", "house", "hut", "mansion", "tent", "trailer"] },

  { level: 15, key: 'starv', theme: 'Vehicles', orient: 2, size: { cols: 8, rows: 10 }, overlap: true, words: ["speeder", "tie", "xwing", "falcon", "destroyer", "transport"] },
  { level: 16, key: 'starp', theme: 'People', orient: 2, size: { cols: 8, rows: 10 }, overlap: true, words: ["hansolo", "chewbacca", "luke", "lea", "obiwan", "darthvader", "padme", "palpatine"] },
  { level: 17, key: 'starplace', theme: 'Places', orient: 2, size: { cols: 8, rows: 10 }, overlap: true, words: ["deathstar", "endor", "tattooine", "hoth", "naboo", "alderon", "cloudcity"] },
  { level: 18, key: 'starpeople', theme: 'More People', orient: 2, size: { cols: 8, rows: 10 }, overlap: true, words: ["Quigon", "darthmaul", "emperor", "bobafett", "ray", "finn", "bensolo", "monmotha", "phasma", "tarkin"] },
  { level: 19, key: 'starall', theme: 'Stuff', orient: 2, size: { cols: 8, rows: 10 }, overlap: true, words: ["lightsaber", "blaster", "droids", "carbonite", "force", "jedi", "plans", "shields", "hyperspace"] },

  { level: 20, key: 'lotrh', theme: 'Hobbits', orient: 2, size: { cols: 8, rows: 10 }, overlap: true, words: ["bilbo", "frodo", "peregrin", "merry", "samwise", "lobelia", "proudfoot", "rose", "gaffer"] },
  { level: 21, key: 'lotrg', theme: 'Good', orient: 2, size: { cols: 8, rows: 10 }, overlap: true, words: ["gandolf", "treebeard", "galadriell", "elrond", "elfstone", "gimli", "bombadil", "smeagol"] },
  { level: 22, key: 'lotrb', theme: 'Bad', orient: 2, size: { cols: 8, rows: 11 }, overlap: true, words: ["sauron", "saruman", "wormtounge", "witchking", "barlog", "orc", "gollum", "ted", "gorbag"] },
  { level: 23, key: 'lotrp', theme: 'Places', orient: 2, size: { cols: 8, rows: 11 }, overlap: true, words: ["shire", "rivendell", "lorien", "mordor", "rohan", "minastirith", "moria", "helmsdeep", "isengard"] },
  { level: 24, key: 'lotrs', theme: 'Stuff', orient: 2, size: { cols: 8, rows: 10 }, overlap: true, words: ["aragorn", "andural", "butterbur", "weed", "ring", "havens", "elves", "bagend", "sharky", "partytree", "potato"] },

  { level: 25, key: 'com1', theme: 'Hardware', orient: 2, size: { cols: 8, rows: 11 }, overlap: true, words: ["keyboard", "mouse", "monitor", "harddrive", "printer", "server", "cable", "modem", "network"] },
  { level: 26, key: 'com2', theme: 'Software', orient: 2, size: { cols: 8, rows: 11 }, overlap: true, words: ["word", "excel", "outlook", "paint", "teams", "notepad", "chrome", "explorer"] },
  { level: 27, key: 'com3', theme: 'Problems', orient: 2, size: { cols: 8, rows: 11 }, overlap: true, words: ["crash", "virus", "phishing", "malware", "overheat", "whitescreen", "offline",] },
  { level: 28, key: 'com4', theme: 'Coding', orient: 2, size: { cols: 8, rows: 11 }, overlap: true, words: ["function", "editor", "git", "script", "code", "variable", "method", "python", "basic", "java"] },
  { level: 29, key: 'com5', theme: 'Internet', orient: 2, size: { cols: 8, rows: 11 }, overlap: true, words: ["wifi", "browser", "popup", "domain", "google", "bing", "online", "facebook", "twitter", "instagram"] },

  { level: 30, key: 'animal1', theme: 'Dogs', orient: 2, size: { cols: 8, rows: 11 }, overlap: true, words: ["chihuahua", "bulldog", "terrier", "collie", "shepherd", "boxer", "hound", "beagle", "rottweiler", "pinsher", "mastiff"] },
  { level: 31, key: 'animal2', theme: 'Safari', orient: 2, size: { cols: 8, rows: 11 }, overlap: true, words: ["lion", "leopard", "cheetah", "rhino", "elephant", "hippo", "giraffe", "hyena", "gazelle", "warthog", "monkey"] },
  { level: 32, key: 'animal3', theme: 'Pets', orient: 2, size: { cols: 8, rows: 11 }, overlap: true, words: ["dog", "cat", "hamster", "fish", "bird", "snake", "iguana", "ferret", "gerbil", "lizard", "turtle"] },
  { level: 33, key: 'animal4', theme: 'On the Farm', orient: 2, size: { cols: 8, rows: 11 }, overlap: true, words: ["cow", "goat", "pig", "chicken", "sheep", "turkey", "horse", "llama", "buffalo", "rooster"] },
  { level: 34, key: 'animal5', theme: 'Kill You', orient: 2, size: { cols: 8, rows: 11 }, overlap: true, words: ["crocodile", "dingo", "shark", "cobra", "gator", "tarantula", "scorpian", "anaconda", "wolf", "stingray"] },
];

/*






*/

