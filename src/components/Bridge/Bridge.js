import React, { useEffect } from 'react'
import GenerateBridge from './GenerateBridge/GenerateBridge';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import Timer from './Timer/Timer';
import sorted_words from '../../data/scrabble_words_sorted.json'
import check_words from '../../data/scrabble_words.json'
import Letters from './Letters/Letters';
import points from '../../data/point_values.json'
import './Bridge.css'
import ClearIcon from '@mui/icons-material/Clear';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Bridge(props) {
    const [bridge, setBridge] = useState([])
    const [level, setLevel] = useState(4)
    const [letters, setLetters] = useState('')
    const [currLetters, setCurrLetters] = useState('')
    const [currBridge, setCurrBridge] = useState([])
    const [currPosition, setCurrPosition] = useState([0,0])
    const [status, setStatus] = useState('')
    const [extraLetters, setExtraLetters] = useState(3);
    const [score, setScore] = useState(0)
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const vowels = "aeiou"
    
    useEffect(() => {
        if(bridge.length === 0){
            handleGenerate(3,1, extraLetters)
        }
        if(props.pressed === 'Backspace'){
            if(!(currPosition[0] === 0 && currPosition[1] === 0)){
                deleteKey();
            }
        } else {
            if(!(currPosition[1] === currBridge.length  || currPosition[0] === currBridge[0].length)){
                detectKeyDown(props.pressed);
            }
        }
    },[props.switch])

    function deleteKey(){
        let copy = JSON.parse(JSON.stringify(currBridge))
        if(currBridge[0]){
            let pos_copy = JSON.parse(JSON.stringify(currPosition))

            if(copy[currPosition[1]] && alphabet.includes(copy[currPosition[1]][currPosition[0]-1])){
                pos_copy[0]--
                setCurrPosition(pos_copy)
            } else {
                pos_copy[1]--
                setCurrPosition(pos_copy)
            }
            setCurrLetters(currLetters + copy[pos_copy[1]][pos_copy[0]])
            copy[pos_copy[1]][pos_copy[0]] = 1;
            setCurrBridge(copy)

        }
    }
    function detectKeyDown(key){
        if(currLetters.includes(key)){
            let copy = JSON.parse(JSON.stringify(currBridge))
            let copyLetters = JSON.parse(JSON.stringify(currLetters))
            let indexToRemove = copyLetters.indexOf(key);

            // If the letter is found in the string, remove it
            if (indexToRemove !== -1) {
                copyLetters = copyLetters.slice(0, indexToRemove) + copyLetters.slice(indexToRemove + 1);
                setCurrLetters(copyLetters)
            }
            if(currBridge[0]){
                copy[currPosition[1]][currPosition[0]] = key
                let pos_copy = JSON.parse(JSON.stringify(currPosition))
                setCurrBridge(copy)
                if(currPosition[0] === currBridge[0].length -1 && currPosition[1] === currBridge.length -1){
                    validate(copy);
                } 
                    if(copy[currPosition[1]][currPosition[0]+1] === 1){
                        pos_copy[0]++
                        setCurrPosition(pos_copy)
                    } else {
                        pos_copy[1]++
                        setCurrPosition(pos_copy)
                    }

            }
        }
    }
    let first = true;
    function handleGenerate(width, height, extra){
        setCurrPosition([0,0])
        setStatus('')
        // const row = new Array(width).fill(0);
        setLetters('')
        setCurrLetters('')
        const final = [width-1, height-1];
        let directionV = false;
        let grid = new Array(height).fill(new Array(width).fill(0));
        let copy;
        let outcome;
        let position = [0,0]
        while(!(position[0] === final[0] && position[1] === final[1])){
            copy = JSON.parse(JSON.stringify(grid))
            if(directionV){
                if(position[1] !== final[1]){
                    outcome = verticalLine(copy, position,width, height)
                    grid = outcome[0]
                    position = outcome[1]
                }
            } else {
                if(position[0] !== final[0]){
                    outcome = lateralLine(copy,position,width, height)
                    grid = outcome[0]
                    position = outcome[1]
                }
            }
            directionV = !directionV;
        }
        first = true
        grid[height-1][width-1] = 1;
        setBridge(grid);
        setCurrBridge(grid);
        generateLetters(grid, extra);
    }
    function lateralLine(grid, position, width, height){
        let lateral = Math.floor(Math.random() * (width - position[0])) + 1
        
        for (let index = 0; index < lateral; index++) {
            grid[position[1]][position[0] + index] = 1;
        }
        if(position[1] === height -1){
            position = [position[0]+ lateral - 1, position[1]]
        } else {
            position = [position[0]+ lateral - 1, position[1] +1]
        }
        return [grid,position]
    }
    function verticalLine(grid, position,width, height){
        let vertical = Math.floor(Math.random() * (height - position[1])) + 1
        for (let index = 0; index < vertical; index++) {
            grid[position[1] + index][position[0]] = 1;
        }
        if(position[0] === width -1){
            position = [position[0], position[1] + vertical - 1]
        } else{
            position = [position[0] + 1, position[1] + vertical - 1]
        }
        return [grid, position]
    }
    function generateLetters(grid, extra){
        console.log("generate: ", grid,extra)
        let redo = false;
        let firstLetter = '';
        let directionH = true;
        let wordlength = 1;
        let x = 0;
        for (let h = 0; h < grid.length; h++) {

            if(directionH){
                for (let w = x; w < grid[0].length; w++) {
                    if(!grid[h][w+1]){
                        firstLetter = getWord(wordlength,firstLetter)
                        if(firstLetter === '0'){
                            redo = true;
                        }
                        wordlength = 1
                        x = w;
                        directionH = !directionH
                        break;
                    } else {
                        wordlength++
                    }
                }
            } else{
                if(!grid[h+1] || !grid[h+1][x]){
                    firstLetter = getWord(wordlength+1,firstLetter)
                    if(firstLetter === '0'){
                        redo = true;
                    }
                    directionH = !directionH
                    wordlength = 1
                    h--;
                } else {
                    wordlength++
                }
            }    
        }
        addExtraLetters(extra)
        if(redo){
            setLetters('')
            setCurrLetters('')
            generateLetters(grid, extra)
        }
    }
    function addExtraLetters(num){
        let letters = ''
        for (let index = 0; index < num-1; index++) {
            letters=letters+alphabet[Math.floor(Math.random() * alphabet.length)] 
        }
        letters = letters + vowels[Math.floor(Math.random() * vowels.length)]
        setCurrLetters((previous)=>randomizeString( previous+letters))
        setLetters((previous)=>randomizeString( previous+letters))
    }
    function getWordScore(word){
        let output = 0;
        if(word.length > 1){
            [...word].forEach(element => {
                output = output + points[element]
            });
        }   
        return output;
    }
    function validate(grid){
        let valid = true;
        let directionH = true;
        let word = '';
        let x = 0;
        let levelScore = 0;
        let first = true;
        for (let h = 0; h < grid.length; h++) {

            if(directionH){
                for (let w = x; w < grid[0].length; w++) {
                    if(!grid[h][w+1]){
                        // firstLetter = getWord(wordlength,firstLetter)
                        word = word + grid[h][w]
                        if(word.length >1){
                            if(first){
                                levelScore = levelScore + getWordScore(word)
                                first = false
                            } else{
                                levelScore = levelScore + getWordScore(word.slice(1))
                            }
                            if(!check_words[word]){
                                valid = false
                            }
                        }
                        word = word.slice(-1)
                        x = w;
                        directionH = !directionH
                        break;
                    } else {
                        word = word + grid[h][w]
                    }
                }
            } else{
                if(!grid[h+1] || !grid[h+1][x]){
                    // firstLetter = getWord(wordlength+1,firstLetter)
                    word = word + grid[h][x]
                    if(word.length >1){
                        if(first){
                            levelScore = levelScore + getWordScore(word)
                            first = false
                        } else{
                            levelScore = levelScore + getWordScore(word.slice(1))
                        }
                        if(!check_words[word]){
                            valid = false
                        }
                    }
                    directionH = !directionH
                    word = ''
                    h--;
                } else {
                    word = word + grid[h][x]
                }
            }
        }       
        console.log("valid: ", valid)
        if(valid){
            props.setTime()
            setScore((prev) => prev+levelScore)
            setStatus('Correct')
            setTimeout(function(){
                let random = Math.floor( Math.random() * 2 )
                let split = Math.floor(Math.random() * (level-1))+1
                let w = split
                let h = level - split
                if(extraLetters === 3){
                    if(random === 1){
                        w++
                    } else {
                        h++
                    }
                    setExtraLetters(w+h-1);
                    handleGenerate(w,h, w+h-1)
                    setLevel(w+h)
                } else {
                    handleGenerate(w,h, extraLetters-1)
                    setExtraLetters((previous) =>previous-1)
                }
            }, 1500)
        } else{
            setStatus('Oops Try Again')
        }
    }
    function clear(){
        console.log("trigger")
        setCurrBridge(bridge);
        setCurrLetters(letters);
        setCurrPosition([0,0])
    }

    function getWord(length, startingLetter){
        if(length > 1){
        if(startingLetter === ''){
            startingLetter = alphabet[Math.floor(Math.random() * alphabet.length)]
        }
        const words = sorted_words[length][startingLetter]
        if(!words){
            console.log("OH NO IT BROKE")
            return '0'
        }
        const word = words[Math.floor(Math.random() * words.length)];
        console.log("generated word: ", word)
        if(first){
            setLetters((previous)=>previous+word)
            setCurrLetters((previous)=>previous+word)
            first = false;
        }else{
            setLetters((previous)=>previous+word.slice(1))
            setCurrLetters((previous)=>previous+word.slice(1))
        }
        return word.slice(-1)
    }   
    return ''
    }
    function randomizeString(str){
        // convert the string to an array of characters
        const chars = str.split("");
        // iterate over the array from the end to the beginning
        for (let i = chars.length - 1; i > 0; i--) {
         // choose a random index from 0 to i (inclusive)
            const j = Math.floor(Math.random() * (i + 1));
            // swap the current character with the randomly chosen one
            [chars[i], chars[j]] = [chars[j], chars[i]];
        }
        // convert the array back to a string and return it
        return chars.join("");
    }
  return (
    <>
    <div className='game'>
        <div className='container m'>
            <Timer time={props.time}></Timer>
        </div>

        <div>SCORE: {score}</div>
        
        <div className='container bridge'>
            <GenerateBridge data={currBridge}></GenerateBridge>
        </div>
        <div className='container'>
            <Letters data={currLetters}></Letters>
        </div>
        <div>{status}</div>
      
      <IconButton className='clear-button' size="large" onClick={clear}><ClearIcon fontSize="inherit" style={{color:'#FF3C38'}}></ClearIcon></IconButton>
      <IconButton className='clear-button' size="large" onClick={deleteKey}><ArrowBackIcon fontSize="inherit" style={{color:'#00BBF9'}}></ArrowBackIcon></IconButton>
    </div>
    </>
  )
}

