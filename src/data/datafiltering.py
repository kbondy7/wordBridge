import json
f = open('scrabble_words.json')
data = json.load(f)


test = { "aah": 1,
    "aahed": 1,
    "aahing": 1,
    "aahs": 1,
    "aal": 1,
    "aalii": 1,
    "aaliis": 1,
    "aals": 1,
    "aam": 1,
    "aani": 1,
    "aardvark": 1,
    "aardvarks": 1,
    "aardwolf": 1,
    "aardwolves": 1,
    "aargh": 1,}
def run():
    new = {1:{}, 2:{}, 3:{}, 4:{}, 5:{}, 6:{}, 7:{}, 8:{}, 9:{}, 10:{},20:{}, 21:{}, 22:{}, 1:{}, 2:{}, 13:{}, 14:{}, 15:{}, 16:{}, 17:{}, 18:{}, 19:{}, 20:{}, 11:{}, 12:{}, 23:{}, 24:{}, 25:{}, 26:{}, 27:{},28:{} ,29:{},30:{}, 31:{}, 32:{}, 33:{}, 34:{}, 35:{}, 36:{}, 37:{},38:{} ,39:{}}
    print(data['abbreviations'])
    for key in data:
        new[len(key)].setdefault(key[0], []).append(key)
        # new.setdefault(key[0], []).append(key)
    print('worked')
    json_object = json.dumps(new, indent=4)
    with open("scrabble_words_sorted.json", "w") as outfile:
        outfile.write(json_object)

def run2():
    new = {}
    for i in data:
        new[i] = 1
    json_object = json.dumps(new, indent=4)
    with open("scrabble_words.json", "w") as outfile:
        outfile.write(json_object)

if __name__ == '__main__':
    run()