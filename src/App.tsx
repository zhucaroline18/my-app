import React, {ChangeEvent} from 'react';
//import logo from './logo.svg';
//import App from './App.css';
import { CDBAnimation, CDBContainer } from 'cdbreact';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Stack from 'react-bootstrap/Stack';
import BootRow from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';
import { Accordion } from 'react-bootstrap';
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBRange } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

export interface AppState {
  page: string
  books: string[]
  time: number
  bookDivs: JSX.Element[]
  distance: number
  minIndex: number
  isRunning: boolean
  dataType: string
  poles: number[]
  poleDivs: JSX.Element[]
  amount: number
  colorMap: Map<string, number>
}

export interface AppProps{

}
const shuffle = (array: string[]) => { 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
}; 
const shuffle2 = (array: number[]) => { 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
}; 

let map = new Map<string, number>([
  ['#ff3359',4],
  ['#ff4154',5],
  ['#ff4e50',6],
  ['#ff5b4c',7],
  ['#ff6648',8],
  ['#ff7245',9],
  ['#ff7c42',10],
  ['#ff873f',11],
  ['#ff923d',12],
  ['#ff9c3c',13],
  ['#ffa63c',14],
  ['#ffb03d',15],
  ['#ffba40',16],
  ['#ffc343',17],
  ['#ffcd47',18],
  ['#ffd64d',19],
  ['#ffdf54',20],
  ['#ffe85c',21],
  ['#fdf164',22],
  ['#fafa6e',23],
  ['#fafa6e',24],
  ['#eef36c',25],
  ['#e1eb6b',26],
  ['#d6e469',27],
  ['#cadc68',28],
  ['#bfd566',29],
  ['#b4cd64',30],
  ['#aac663',31],
  ['#a0be61',32],
  ['#96b65f',33],
  ['#8daf5d',34],
  ['#84a75b',35],
  ['#7b9f59',36],
  ['#739857',37],
  ['#6b9055',38],
  ['#648852',39],
  ['#5c8150',40],
  ['#56794d',41],
  ['#4f724a',42],
  ['#496a47',43],
  ['#496a47',44],
  ['#4a704f',45],
  ['#4c7658',46],
  ['#4d7c61',47],
  ['#4f826a',48],
  ['#518873',49],
  ['#538e7c',50],
  ['#569485',51],
  ['#599a8e',52],
  ['#5d9f98',53],
  ['#61a5a1',54],
  ['#66abaa',55],
  ['#6bb1b4',56],
  ['#71b6bd',57],
  ['#78bcc6',58],
  ['#7fc1cf',59],
  ['#87c7d7',60],
  ['#8fcce0',61],
  ['#98d2e8',62],
  ['#a1d7f0',63],
  ['#a1d7f0',64],
  ['#93cdeb',65],
  ['#84c3e6',66],
  ['#77b9e1',67],
  ['#69afdb',68],
  ['#5ca5d6',69],
  ['#509bd1',70],
  ['#4390cc',71],
  ['#3786c6',72],
  ['#2c7cc1',73],
  ['#2172ba',74],
  ['#1667b4',75],
  ['#0c5dad',76],
  ['#0653a6',77],
  ['#04489f',78],
  ['#073e97',79],
  ['#0c338e',80],
  ['#122885',81],
  ['#171c7c',82],
  ['#1b0d72',83],
  ['#1b0d72',84],
  ['#291479',85],
  ['#351b7f',86],
  ['#3f2186',87],
  ['#4a288d',88],
  ['#542f94',89],
  ['#5e369a',90],
  ['#673da1',91],
  ['#7145a8',92],
  ['#7b4caf',93],
  ['#8454b6',94],
  ['#8e5bbe',95],
  ['#9763c5',96],
  ['#a16bcc',97],
  ['#aa72d3',98],
  ['#b47ada',99],
  ['#bd82e2',100],
  ['#c78ae9',101],
  ['#d093f1',102],
  ['#da9bf8',103]

]);

let Colors: string[] = [
  /*
  '#840677',  '#960675',  '#a70c72',  '#b6166e',  '#c4216a',  '#d12e66',  '#dc3b61',  '#e6495d',  '#ef5758','#f66654',
  '#fc7550','#ff834d',  '#ff924a','#ffa149',
  '#ffb049','#ffbf4c',  '#ffce51','#ffdd58',
  '#ffeb62','#fafa6e','#fafa6e','#edf76f',*/
  '#e0f470',
  '#d4f171',  '#c8ed73',
  '#bcea75',  '#b0e678',
  '#a5e27a',  '#99de7c',
  '#8eda7f',  '#83d681',
  '#79d283','#6ecd85',
  '#64c987','#5ac489',
  '#50bf8b',  '#46bb8c',
  '#3cb68d','#32b18e',
  '#28ac8f','#1ea78f',
  '#12a28f','#039d8f',
  '#00988e','#00938d',
  '#008e8c','#00898a',
  '#008488','#007e86',
  '#007983','#057480',
  //'#0e6f7d','#156a79',
  //'#1a6575','#1e6071',
  //'#225b6c','#255667',
  //'#275163','#294d5d',
  //'#2a4858'
  ];



export class App extends React.Component<AppProps, AppState> {

  constructor(props: any){
    super(props)
    let bookDivs: JSX.Element[] = [];
    /*
    for (let i = 0; i<Colors.length; i++)
    {
      bookDivs.push(
        <span>
          <svg width="42" height="150">
            <rect x="10" y="10" rx="2" width = "20" height = "80" stroke="black" strokeWidth="2" fill={Colors[i]} />
          </svg>
        </span>
      )
    }*/
    let colorArr: string[]=[];

    let a = map.keys();
    for (let i = 0; i<50; i++)
    {
      let b = a.next().value;
      bookDivs.push(
        <span>
          <svg width="13" height="100">
            <rect x="1" y="1" rx="1" width = "11" height = "60" stroke="black" strokeWidth="1.5" fill={b} />
          </svg>
        </span>
      )
      colorArr.push(b);
    }
    
    this.state = {
      page: "",
      books: colorArr,
      time: 250,
      bookDivs: bookDivs,
      distance: 0,
      minIndex: 0, 
      isRunning: false,
      dataType: "books",
      poleDivs: [],
      poles: [],
      amount: 50,
      colorMap: map
    }
  }

  render(): React.ReactNode{
    let nodes: JSX.Element[]=[];

    nodes.push(
      <style type="text/css">
        {`
           .animated {
            width: 100px;
            height: 100px;
            background-color: red;
            position: relative;
            animation-name: example;
            animation-duration: 5s;
            animation-timing-function: linear;
            animation-delay: 2s;
            animation-iteration-count: infinite;
            animation-direction: alternate;
          }
          
          @keyframes example {
            0%   {background-color:red; left:0px; top:0px;}
            25%  {background-color:yellow; left:200px; top:0px;}
            50%  {background-color:blue; left:200px; top:200px;}
            75%  {background-color:green; left:0px; top:200px;}
            100% {background-color:red; left:0px; top:0px;}
          }

          .oneAnimation{
            width: 100px;
            height: 100px;
            position: relative;
            animation-name: oneAnimation;
            animation-duration: 3s;  
            animation-delay: 2s;
            animation-fill-mode: both;
          }
          
          @keyframes oneAnimation {
            0% {top: 0px; left: 0px}
            25% {top: -100px, left: 0px}
            50% {top:-100px, left: ${this.state.distance}px}
            100% {top: 0px, left: ${this.state.distance}px}
          }
          .oneAnimation2{
            width: 100px;
            height: 100px;
            position: relative;
            animation-name: oneAnimation2;
            animation-duration: 3s;  
            animation-delay: 2s;
            animation-fill-mode: both;
          }
          
          @keyframes oneAnimation2 {
            0% {top: 0px; left: 0px}
            25% {top: -100px, left: 0px}
            50% {top:-100px, left: -${this.state.distance}px}
            100% {top: 0px, left: -${this.state.distance}px}
          }
        `}
        </style>
    )
    const navBar = (
    <Navbar className = "color-nav color-white" id = "navBar"  data-bs-theme="dark">
    <Container id = "navBarContainer">
    <Navbar.Brand id = "brand-navBar" href="#home" >
    <img
        alt=""
        src="bookstack.png"
        width="30"
        height="30"
        className="d-inline-block align-top"
        />{' '}
        Sorting Visualized
    </Navbar.Brand>
    <Navbar.Toggle />
        <Navbar.Collapse id = "navBarCollapse" className="justify-content-end">
        <Nav id = "navbar home link" className="me-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">Archive</Nav.Link>

        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
    )
    
    nodes.push(
      <div key = "nav bar regular">
                    <style type="text/css">
                    {`
                        .color-nav {
                          background-color: rgb(0, 108, 132);
                          color: #FFFFFF;
                        }
                        .color-lightBlue {
                            background-color: rgb(110, 181, 192);
                            }
                        .color-pink {
                            background-color: #FFCCBB;
                        }
                        .color-grey {
                          background-color: #a3b1d9;
                      }
                        .remove-line {
                            text-decoration: none;
                            color: rgb(110, 181, 192);
                        }
                        .nav-tabs .nav-item .nav-link {
                                color: rgb(110, 181, 192);
                            }
                        .nav-tabs .nav-item .nav-link.active {
                                color:rgb(0, 108, 132);
                            }
                        .accordion-button:not(.collapsed) {
                            background-color: #FFCCBB;
                        }
                        .color-white {
                          color: #FFFFFF;

                        }
                    `}
                    </style>
                    
                    <MDBNavbar expand='lg' dark className = "color-nav">
                      <MDBContainer fluid>
                      <MDBNavbarBrand href='#'><img
                        alt=""
                        src="bookstack.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        />{' '}
                        Sorting Visualized</MDBNavbarBrand>
                        </MDBContainer>
                  </MDBNavbar>

                </div>
    )

    //let books: JSX.Element[]=[];
    let buttons: JSX.Element[] = [];
    if (!this.state.isRunning)
    {
      buttons.push(
        <Container>
          
          <Button className = "color-lightBlue m-2" onClick = {this.handleGenerateRandom}>
            Shuffle Items
          </Button>
          <Button className = "color-pink m-2" onClick = {(evt)=>this.bubbleSort()}>
            Bubble Sort
          </Button>
          <Button className = "color-pink m-2" onClick = {(evt)=>this.selectionSort(0)}>
            Selection Sort
          </Button>
          <Button className = "color-pink m-2" onClick = {(evt)=>this.insertionSort(1)}>
            Insertion Sort
          </Button>
          <Button className = "color-pink m-2" onClick = {(evt)=>this.quickSort()}>
            Quick Sort
          </Button>
          
        </Container>
      )
    }
    else 
    {
      buttons.push(
        <Container>
          <Button className = "disabled m-2" >
            Shuffle Items
          </Button>
          <Button className = "disabled m-2" >
            Bubble Sort
          </Button>
          
          <Button className = "disabled m-2" >
            Selection Sort
          </Button>
          <Button className = "disabled m-2" >
            Insertion Sort
          </Button>
          <Button className = "disabled m-2" >
            Quick Sort
          </Button>
          
        </Container>
      )
    }

    let a: JSX.Element
    if (this.state.dataType==="books")
    {
      a = (<Container className = "mt-4 mb-4">
      {this.state.bookDivs}
      </Container>)
    }
    else 
    {
      a = (
        <Container className = "mt-4 mb-4">
        {this.state.poleDivs}
        </Container>
      )
    }

    let sliders: JSX.Element[] = []
    let mode: JSX.Element[] = []
    if (!this.state.isRunning)
    {
      sliders.push(
        <Container>
        <MDBRange
          defaultValue={50}
          id='customRange'
          label='Speed'
          className = "m-3"
          onChange = {this.setSpeed}
        />
        <hr/>
        <MDBRange
          defaultValue={50}
          id='customRange'
          label = "Amount"
          max='96'
          className = "m-3"
          onChange = {this.setAmount}
        />
        </Container>
      )
      mode.push(
        <Container>
        <Button className = "m-3 color-lightBlue" onClick = {this.setBooks}>colors</Button>
        <Button className = "m-3 color-lightBlue" onClick = {this.setPoles}>length</Button>
        </Container>
      )
    }
    else 
    {
      sliders.push(
        <Container>
        <MDBRange
          defaultValue={50}
          id='customRange'
          label='Speed'
          className = "m-3"
          onChange = {this.setSpeed}
        />
        <hr/>
        <MDBRange
          defaultValue={50}
          id='customRange'
          disabled
          label = "Amount"
          max='96'
          className = "m-3"
          onChange = {this.setAmount}
        />
        </Container>
      )
      mode.push(
        <Container>
        <Button className = "m-3 disabled" >colors</Button>
        <Button className = "m-3 disabled" >length</Button>
        </Container>
      )
    }

    const myCode = `
    if (a > 0)
    {
      console.log(a);
    }
    `;

    nodes.push(
      <Container>
        <div className = "text-center">
        {a}
        </div>
        {buttons}
        
        <Accordion className = "mx-auto p-3 w-100">
          <Accordion.Item eventKey="0">
              <Accordion.Header>Settings</Accordion.Header>
              <Accordion.Body>
                
                {sliders}
                {mode}
              </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Accordion className = "mx-auto p-3 w-100">
          <Accordion.Item eventKey="0">
              <Accordion.Header>Bubble Sort</Accordion.Header>
              <Accordion.Body>
                swap the position of adjacent items if they're in the wrong order repeatedly until the array becomes sorted
                <pre>
                  i = i+1; i++;
                </pre>
              </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
              <Accordion.Header>Selection Sort</Accordion.Header>
              <Accordion.Body>
                run through the unsorted part of the array to determine which element should be the next element of the sorted part of the array
                <pre>
                  i = i+1; i++;
                </pre>
              </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
              <Accordion.Header>Insertion Sort</Accordion.Header>
              <Accordion.Body>
                from the beginning of the array, insert each element into its correct position of all the elements before it which have already been sorted
                <pre>
                  <code>
                    {myCode}
                  </code>
                </pre>
              </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
              <Accordion.Header>Quick Sort</Accordion.Header>
              <Accordion.Body>
                move all the items larger than the chosen partition to the right and smaller than the chosen partition to the left of the partition and continually do this choosing new parititons in each section until the array is sorted
                <pre>
                  i = i+1; i++;
                </pre>
              </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    )

    return (
      <div>
        {nodes}
      </div>
    )

  }

  //const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

  /*
  selectionSort = (i: number) => {
    let Colors2 = this.state.books;
    if (i<this.state.books.length)
    {
      let minIndex = i;
      for (let j = i+1; j<this.state.books.length; j++)
      {

        if (Colors2[j]<Colors2[minIndex])
        {
          minIndex = j;
        }
        
      }
      const temp = Colors2[minIndex];
      Colors2[minIndex]=Colors2[i];
      Colors2[i]=temp;
      this.setState({books: Colors2});
      i++;
      setTimeout(
        () => { this.selectionSort(i) }, 1000);

    /*
    for (let i = 0; i<this.state.books.length; i++)
    {
      let minIndex = i;
      for (let j = i+1; j<this.state.books.length; j++)
      {
        if (Colors2[j]<Colors2[minIndex])
        {
          minIndex = j;
        }
        const temp = Colors2[minIndex];
        Colors2[minIndex]=Colors2[i];
        Colors2[i]=temp;
      }
      this.setState({books: Colors2});
      setTimeout(1000);*/

   /* }
  }
  */
  async partition (arr: number[], arr2: JSX.Element[],low: number, high: number) {
    let pivot = arr[high];

    let i = low-1;

    for (let j = low; j<=high-1; j++)
    {
      if (arr[j]<pivot){
        i++;
        [arr[i], arr[j]]=[arr[j], arr[i]];
        [arr2[i], arr2[j]]=[arr2[j], arr2[i]];

        this.setState({poles: arr});
        this.setState({poleDivs:arr2});
        await this.pause(this.state.time);
      }
    }
    [arr[i+1], arr[high]]=[arr[high], arr[i+1]];
    [arr2[i+1], arr2[high]]=[arr2[high], arr2[i+1]];
    this.setState({poles: arr});
    this.setState({poleDivs: arr2});
    return i+1
    //await (i+1);
  }
  async partition2 (arr: string[], arr2: JSX.Element[],low: number, high: number) {
    //let pivot = arr[high];
    let pivot = map.get(arr[high]);

    let i = low-1;

    for (let j = low; j<=high-1; j++)
    {
      let curr = map.get(arr[j]);
      if (curr !== undefined && pivot !== undefined && curr<pivot)//arr[j]<pivot)
      {
        i++;
        [arr[i], arr[j]]=[arr[j], arr[i]];
        [arr2[i], arr2[j]]=[arr2[j], arr2[i]];

        this.setState({books: arr});
        this.setState({bookDivs:arr2});
        await this.pause(this.state.time);
      }
    }
    [arr[i+1], arr[high]]=[arr[high], arr[i+1]];
    [arr2[i+1], arr2[high]]=[arr2[high], arr2[i+1]];
    this.setState({books: arr});
    this.setState({bookDivs: arr2});
    return i+1
    //await (i+1)
  }

  pause(milliseconds: number): Promise<void>{
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, milliseconds);
    });
  }
  quickSort () {
    this.setState({isRunning: true})
    if (this.state.dataType === "poles")
    {
      this.quickSort1(this.state.poles, this.state.poleDivs, 0, this.state.poles.length-1)
    }
    else 
    {
      this.quickSort2(this.state.books, this.state.bookDivs, 0, this.state.books.length-1 )
    }
  }
  bubbleSort () {
    this.setState({isRunning: true})
    let poles = this.state.poles
    let poleDivs = this.state.poleDivs;
    let books = this.state.books;
    let bookDivs = this.state.bookDivs;
    if (this.state.dataType === "poles")
    {
      this.bubbleSort1(poles, poleDivs,this.state.poles.length)
    }
    else 
    {
      this.bubbleSort2(books, bookDivs, this.state.books.length);
    }
  }


  async quickSort1(arr: number[], arr3: JSX.Element[],low: number, high: number) {
    if (low<high)
    {
      let arr2= arr;
      let arr4 = arr3;
      let pi: number = await this.partition(arr2, arr4, low, high)

      /*
      setTimeout(
        () => { this.quickSort1(arr2, arr4, low, pi-1) }, this.state.time);
      setTimeout(
        () => { this.quickSort1(arr2, arr4, pi+1, high) }, this.state.time);
        */
      this.quickSort1(arr2, arr4, low, pi-1)
      await this.pause(this.state.time);
      this.quickSort1(arr2, arr4, pi+1, high)
      await this.pause(this.state.time)
      
    }
    else 
    {
      this.setState({isRunning: false})
    }
    
  }
  async quickSort2(arr: string[], arr3: JSX.Element[],low: number, high: number) {
    if (low<high)
    {
      let arr2= arr;
      let arr4 = arr3;
      let pi: number = await this.partition2(arr2, arr4, low, high)

      
      setTimeout(
        () => { this.quickSort2(arr2, arr4, low, pi-1) }, this.state.time);
      setTimeout(
        () => { this.quickSort2(arr2, arr4, pi+1, high) }, this.state.time);
      
    }
    else 
    {
      let isSorted = true;
      for (let i = 1; i<arr.length; i++)
      {
        let curr = map.get(this.state.books[i]);
        let compareTo = map.get(this.state.books[i-1]);
        if (curr !== undefined && compareTo !== undefined && curr<compareTo)
        {
          isSorted = false;
          break;
        }
      }
      if (isSorted)
      {
        this.setState({isRunning: false})
      }
    }
    
  }
  async bubbleSort1 (arr: number[], arr2: JSX.Element[], n: number) {
    let swapped: boolean=false;

    for (let i = 0; i<n-1; i++)
    {
      swapped = false;
      for (let j = 0; j<n-i-1; j++)
      {
        if (arr[j] > arr[j+1])
        {
          [arr[j], arr[j+1]]=[arr[j+1],arr[j]];
          [arr2[j], arr2[j+1]]=[arr2[j+1], arr2[j]]
          swapped = true;


          this.setState({poles: arr});
          this.setState({poleDivs: arr2});
          await this.pause(this.state.time);

        }
      }
      if (swapped === false)
      {
        break;
      }
    }
    this.setState({isRunning: false})
  }
  async bubbleSort2 (arr: string[], arr2: JSX.Element[], n: number) {
    let swapped: boolean=false;

    for (let i = 0; i<n-1; i++)
    {
      swapped = false;
      for (let j = 0; j<n-i-1; j++)
      {
        let num1 = map.get(arr[j]);
        let num2 = map.get(arr[j+1]);
        if (num1!== undefined && num2 !== undefined && num1>num2)//arr[j] > arr[j+1])
        {
          [arr[j], arr[j+1]]=[arr[j+1],arr[j]];
          [arr2[j], arr2[j+1]]=[arr2[j+1], arr2[j]];
          swapped = true;


          this.setState({books: arr});
          this.setState({bookDivs: arr2});
          await this.pause(this.state.time);

        }
      }
      if (swapped === false)
      {
        break;
      }
    }
    this.setState({isRunning: false})
  }


  setBooks = () => {
    this.setState({dataType: "books"})
  }
  setPoles = () => {
    let numberArr: number[] = [];
    let divArr: JSX.Element[] = [];
    for (let i = 0; i<this.state.amount; i++)
    {
      numberArr.push((i*2)+10);
    }
    for (let i = 0; i<this.state.amount; i++)
    {
      divArr.push(
        <span>
          <svg width="10" height={numberArr[i]+5}>
            <rect x="10" y="10" width = "10" height = {numberArr[i]} stroke="black" strokeWidth="5" fill="blue" />
          </svg>
        </span>
      )
    }
    this.setState({poles: numberArr});
    this.setState({poleDivs: divArr})
    this.setState({dataType: "poles"});
  }


  async insertionSort (i: number) {
    if (this.state.dataType === "books")
    {
      let BookDivs2 = this.state.bookDivs;
      let books2 = this.state.books;
      if (i === 1)
      {
        this.setState({isRunning: true})
      }
      if (i<this.state.books.length)
      {
        let key = this.state.books[i];
        //let key = map.get(this.state.books[i]);
        const key3 = (
          <span>
                <svg width="13" height="100">
                  <rect x="1" y="1" rx="1" width = "11" height = "60" stroke="black" strokeWidth="1.5" fill={books2[i]} />
                </svg>
              </span>
          /*
          <span>
          <svg width="42" height="150">
            <rect x="10" y="10" rx="2" width = "20" height = "80" stroke="black" strokeWidth="2" fill={books2[i]} />
          </svg>
          </span>*/
        )
        BookDivs2[i]=key3;
        let key2 = this.state.bookDivs[i];
        let j = i-1;

        let compareTo = map.get(this.state.books[j]);
        let keyValue = map.get(key);
        while (j >= 0 && compareTo !== undefined && keyValue !== undefined && compareTo > keyValue)//this.state.books[j]>key)
        {
          //[arr[i], arr[j]]=[arr[j], arr[i]];

          [books2[j+1], books2[j]]=[books2[j], books2[j+1]];
          [BookDivs2[j+1], BookDivs2[j]]=[BookDivs2[j], BookDivs2[j+1]];
          j = j-1;

          compareTo = map.get(this.state.books[j]);  // added

          this.setState({books: books2});
          this.setState({bookDivs: BookDivs2})
          await this.pause(this.state.time);
        }
        books2[j+1]=key;
        BookDivs2[j+1]=key2;
        this.setState({books: books2});
        this.setState({bookDivs: BookDivs2})

        setTimeout(
          () => { this.insertionSort(i+1) }, this.state.time);
      }
      else {
        this.setState({isRunning: false})
      }
    }
    else 
    {
      let BookDivs2 = this.state.poleDivs;
      let books2 = this.state.poles;
      if (i === 1)
      {
        this.setState({isRunning: true})
      }
      if (i<this.state.poles.length)
      {
        let key = this.state.poles[i];
        let key2 = this.state.poleDivs[i];
        let j = i-1;

        while (j >= 0 && this.state.poles[j]>key)
        {
          //[arr[i], arr[j]]=[arr[j], arr[i]];

          [books2[j+1], books2[j]]=[books2[j], books2[j+1]];
          [BookDivs2[j+1], BookDivs2[j]]=[BookDivs2[j], BookDivs2[j+1]];
          j = j-1;
          this.setState({poles: books2});
          this.setState({poleDivs: BookDivs2})
          await this.pause(this.state.time);
        }
        books2[j+1]=key;
        BookDivs2[j+1]=key2;
        this.setState({poles: books2});
        this.setState({poleDivs: BookDivs2})

        setTimeout(
          () => { this.insertionSort(i+1) }, this.state.time);
      }
      else {
        this.setState({isRunning: false})
      }
    }
  }
/*
  insertionSort = (i: number)=> {
    if (this.state.dataType === "books")
    {
      let BookDivs2 = this.state.bookDivs;
      let books2 = this.state.books;
      if (i === 1)
      {
        this.setState({isRunning: true})
      }
      if (i<this.state.books.length)
      {
        let key = this.state.books[i];
        let key2 = this.state.bookDivs[i];
        let j = i-1;

        while (j >= 0 && this.state.books[j]>key)
        {
          books2[j+1]=books2[j];
          BookDivs2[j+1]=BookDivs2[j];
          j = j-1;
        }
        books2[j+1]=key;
        BookDivs2[j+1]=key2;
        this.setState({books: books2});
        this.setState({bookDivs: BookDivs2})


        setTimeout(
          () => { this.insertionSort(i+1) }, this.state.time);
      }
      else {
        this.setState({isRunning: false})
      }
    }
    else 
    {
      let BookDivs2 = this.state.poleDivs;
      let books2 = this.state.poles;
      if (i === 1)
      {
        this.setState({isRunning: true})
      }
      if (i<this.state.poles.length)
      {
        let key = this.state.poles[i];
        let key2 = this.state.poleDivs[i];
        let j = i-1;

        while (j >= 0 && this.state.poles[j]>key)
        {
          books2[j+1]=books2[j];
          BookDivs2[j+1]=BookDivs2[j];
          j = j-1;
        }
        books2[j+1]=key;
        BookDivs2[j+1]=key2;
        this.setState({poles: books2});
        this.setState({poleDivs: BookDivs2})

        setTimeout(
          () => { this.insertionSort(i+1) }, this.state.time);
      }
      else {
        this.setState({isRunning: false})
      }
    }
  }
  */
  /*
  insertionSort = (i: number)=> {
    let BookDivs2 = this.state.bookDivs;
    if (i === 1)
    {
      this.setState({isRunning: true})
    }
    if (i<this.state.books.length)
    {
      let a: JSX.Element = (BookDivs2[i]);
      this.insertionSortLoop(i, a);
      setTimeout(
        () => { this.insertionSort(i+1) }, this.state.time);
    }
    else {
      this.setState({isRunning: false})
    }
  }
  insertionSortLoop = (i: number, a: JSX.Element) => {
    let BookDivs2 = this.state.bookDivs;
    let books2 = this.state.books;
    if (i>0 && this.state.books[i]<this.state.books[i-1])
    {
      const temp = BookDivs2[i];
      BookDivs2[i]=BookDivs2[i-1];
      BookDivs2[i-1]=temp;

      const temp2 = books2[i];
      books2[i]=books2[i-1];
      books2[i-1]=temp2;

      this.setState({bookDivs:BookDivs2})
      this.setState({books: books2})
      setTimeout(
        () => { this.insertionSortLoop(i-1, a)}, this.state.time);
    }
  }*/

  async selectionSort (i: number) {
    if (this.state.dataType === "books")
    {
      
      let Colors2 = this.state.books;
      let BookDivs2 = this.state.bookDivs;
      if (i === 0)
      {
        this.setState({isRunning: true});
      }
      BookDivs2[BookDivs2.length-1]=(
        <span>
        <svg width="13" height="100">
          <rect x="1" y="1" rx="1" width = "11" height = "60" stroke="black" strokeWidth="1.5" fill={Colors2[Colors2.length-1]} />
        </svg>
      </span>
        /*
        <span>
        <svg width="42" height="150">
          <rect x="10" y="10" rx="2" width = "20" height = "80" stroke="black" strokeWidth="2" fill={Colors2[BookDivs2.length-1]} />
        </svg>
        </span>*/
        )
      this.setState({bookDivs: BookDivs2})

      // selection sort -----------------------------
      if (i<this.state.books.length)
      {
        let minIndex = i
        BookDivs2[i]=(
          /*
          <span>
          <svg width="42" height="150">
            <rect x="10" y="10" rx="2" width = "20" height = "80" stroke="orange" strokeWidth="2" fill={Colors2[i]} />
          </svg>
          </span>*/
          <span>
            <svg width="13" height="100">
              <rect x="1" y="1" rx="1" width = "11" height = "60" stroke="orange" strokeWidth="1.5" fill={Colors2[i]} />
            </svg>
          </span>
          )
        if (i>0)
        {
          BookDivs2[i-1]=(
            <span>
              <svg width="13" height="100">
                <rect x="1" y="1" rx="1" width = "11" height = "60" stroke="black" strokeWidth="1.5" fill={Colors2[i-1]} />
              </svg>
            </span>
            /*
              <span>
              <svg width="42" height="150">
                <rect x="10" y="10" rx="2" width = "20" height = "80" stroke="black" strokeWidth="2" fill={Colors2[i-1]} />
              </svg>
              </span>*/
              )
        }
        this.setState({bookDivs: BookDivs2})
        for (let j = i+1; j<this.state.books.length; j++)
        {
          if (j-1 !== minIndex)
          {
            BookDivs2[j-1]=(
              <span>
                <svg width="13" height="100">
                  <rect x="1" y="1" rx="1" width = "11" height = "60" stroke="black" strokeWidth="1.5" fill={Colors2[j-1]} />
                </svg>
              </span>
              /*
              <span>
              <svg width="42" height="150">
                <rect x="10" y="10" rx="2" width = "20" height = "80" stroke="black" strokeWidth="2" fill={Colors2[j-1]} />
              </svg>
              </span>*/
              )
          }
          
          BookDivs2[j]=
          (
            /*
            <span>
            <svg width="42" height="150">
              <rect x="10" y="10" rx="2" width = "20" height = "80" stroke="yellow" strokeWidth="2" fill={Colors2[j]} />
            </svg>
            </span>*/
            <span>
              <svg width="13" height="100">
                <rect x="1" y="1" rx="1" width = "11" height = "60" stroke="yellow" strokeWidth="1.5" fill={Colors2[j]} />
              </svg>
            </span>
          )

          this.setState({bookDivs: BookDivs2});

          let num1 = map.get(Colors2[j]);
          let num2 = map.get(Colors2[minIndex]);
          if (num1 !== undefined && num2 !== undefined )
          {
            if (num1<num2)
            {
              BookDivs2[minIndex]=
              (
                /*
              <span>
              <svg width="42" height="150">
                <rect x="10" y="10" rx="2" width = "20" height = "80" stroke="black" strokeWidth="2" fill={Colors2[minIndex]} />
              </svg>
              </span>*/
              <span>
                <svg width="13" height="100">
                  <rect x="1" y="1" rx="1" width = "11" height = "60" stroke="black" strokeWidth="1.5" fill={Colors2[minIndex]} />
                </svg>
              </span>

              )
              minIndex = j;
              
              BookDivs2[minIndex]=
              (
                <span>
                  <svg width="13" height="100">
                    <rect x="1" y="1" rx="1" width = "11" height = "60" stroke="orange" strokeWidth="1.5" fill={Colors2[minIndex]} />
                  </svg>
                </span>
                /*
              <span>
              <svg width="42" height="150">
                <rect x="10" y="10" rx="2" width = "20" height = "80" stroke="orange" strokeWidth="2" fill={Colors2[minIndex]} />
              </svg>
              </span>*/
              )
              this.setState({bookDivs: BookDivs2});
            }
          }
          await this.pause(this.state.time);

        }
        /*
        this.setState({minIndex: i});
        this.selectionSortLoop(i+1);
        */
        const temp = Colors2[minIndex];
        Colors2[minIndex]=Colors2[i];
        Colors2[i]=temp;

        const temp2 = BookDivs2[minIndex];
        BookDivs2[minIndex]=BookDivs2[i];
        BookDivs2[i]=temp2;
        
  /*
        let distance: number = 40*(minIndex-i);
        this.setState({distance: distance})

        const temp3 = (
          <span>
              <span className = 'oneAnimation'>
                <svg width="42" height="150">
                  <rect x="10" y="10" rx="2" width = "20" height = "80" stroke="black" strokeWidth="2" fill={this.state.books[i]} />
                </svg>
              </span>
          </span>
          )
          const temp4 = (
            <span>
                <span className = "oneAnimation2">
                  <svg width="42" height="150">
                    <rect x="10" y="10" rx="2" width = "20" height = "80" stroke="black" strokeWidth="2" fill={this.state.books[minIndex]} />
                  </svg>
                </span>
            </span>
            )
            //const temp2 = BookDivs2[minIndex];
            BookDivs2[minIndex]=temp3;
            BookDivs2[i]=temp4
  */
        this.setState({books: Colors2});
        this.setState({bookDivs: BookDivs2})

        i++;
        setTimeout(
          () => { this.selectionSort(i) }, this.state.time);
      }
      else 
      {
        this.setState({isRunning: false});
      }
    } 
    else 
    {
      let Colors2 = this.state.poles;
      let BookDivs2 = this.state.poleDivs;
      if (i === 0)
      {
        this.setState({isRunning: true});
      }
      BookDivs2[BookDivs2.length-1]=(
        <span>
          <svg width="10" height={Colors2[BookDivs2.length-1]+5}>
            <rect x="10" y="10" width = "10" height = {Colors2[BookDivs2.length-1]} stroke="black" strokeWidth="5" fill="blue" />
          </svg>
        </span>
        )
      this.setState({bookDivs: BookDivs2})

      // selection sort -----------------------------
      if (i<this.state.poles.length)
      {
        let minIndex = i
        BookDivs2[i]=(
          <span>
          <svg width="10" height={Colors2[i]+5}>
            <rect x="10" y="10" width = "10" height = {Colors2[i]} stroke="orange" strokeWidth="5" fill="blue" />
          </svg>
        </span>
          )
        if (i>0)
        {
          BookDivs2[i-1]=(
              <span>
              <svg width="10" height={Colors2[i-1]+5}>
                <rect x="10" y="10" width = "10" height = {Colors2[i-1]} stroke="black" strokeWidth="5" fill="blue" />
              </svg>
            </span>
              )
        }
        this.setState({poleDivs: BookDivs2})
        for (let j = i+1; j<this.state.poles.length; j++)
        {
          if (j-1 !== minIndex)
          {
            BookDivs2[j-1]=(
              <span>
                <svg width="10" height={Colors2[j-1]+5}>
                  <rect x="10" y="10" width = "10" height = {Colors2[j-1]} stroke="black" strokeWidth="5" fill="blue" />
                </svg>
              </span>
              )
          }
          BookDivs2[j]=
          (
            <span>
              <svg width="10" height={Colors2[j]+5}>
                <rect x="10" y="10" width = "10" height = {Colors2[j]} stroke="yellow" strokeWidth="5" fill="blue" />
              </svg>
            </span>
          )

          this.setState({poleDivs: BookDivs2});

          if (Colors2[j]<Colors2[minIndex])
          {
              BookDivs2[minIndex]=
              (
                <span>
                <svg width="10" height={Colors2[minIndex]+5}>
                  <rect x="10" y="10" width = "10" height = {Colors2[minIndex]} stroke="black" strokeWidth="5" fill="blue" />
                </svg>
              </span>
              )
              minIndex = j;
              
              BookDivs2[minIndex]=
              (
                <span>
                <svg width="10" height={Colors2[minIndex]+5}>
                  <rect x="10" y="10" width = "10" height = {Colors2[minIndex]} stroke="orange" strokeWidth="5" fill="blue" />
                </svg>
              </span>
              )
              this.setState({poleDivs: BookDivs2});
          }
          await this.pause(this.state.time);

        }
        /*
        this.setState({minIndex: i});
        this.selectionSortLoop(i+1);
        */
        const temp = Colors2[minIndex];
        Colors2[minIndex]=Colors2[i];
        Colors2[i]=temp;

        const temp2 = BookDivs2[minIndex];
        BookDivs2[minIndex]=BookDivs2[i];
        BookDivs2[i]=temp2;
        
        this.setState({poles: Colors2});
        this.setState({poleDivs: BookDivs2})

        i++;
        setTimeout(
          () => { this.selectionSort(i) }, this.state.time);
      }
      else 
      {
        this.setState({isRunning: false});
      }
    }
  }
/*
  selectionSortLoop = (i: number) => {
    let BookDivs2 = this.state.bookDivs;
    if (i<this.state.books.length)
    {
      if (i>0)
      {
        const newDiv: JSX.Element = (
          <span>
            <span>
              <svg width="42" height="150">
                <rect x="10" y="10" rx="2" width = "20" height = "80" stroke="black" strokeWidth="2" fill={this.state.books[i-1]} />
              </svg>
            </span>
          </span>
        )
        const newDiv2: JSX.Element = (
          <span>
            <span>
              <svg width="42" height="150">
                <rect x="10" y="10" rx="2" width = "20" height = "80" stroke="black" strokeWidth="2" fill={this.state.books[this.state.books.length-1]} />
              </svg>
            </span>
          </span>
        )
        BookDivs2[i-1]=newDiv;
        BookDivs2[BookDivs2.length-1]=newDiv2;
      }
      if (this.state.books[i]<this.state.books[this.state.minIndex])
      {
        this.setState({minIndex: i})
        const newDiv: JSX.Element = (
          <span>
            <span>
              <svg width="42" height="150">
                <rect x="10" y="10" rx="2" width = "20" height = "80" stroke="orange" strokeWidth="2" fill={this.state.books[i]} />
              </svg>
            </span>
          </span>
        )
        BookDivs2[i]=newDiv;
      }
      else 
      {
        const newDiv: JSX.Element = (
          <span>
            <span>
              <svg width="42" height="150">
                <rect x="10" y="10" rx="2" width = "20" height = "80" stroke="yellow" strokeWidth="2" fill={this.state.books[i]} />
              </svg>
            </span>
          </span>
        )
        BookDivs2[i]=newDiv;
      }

      this.setState({bookDivs: BookDivs2})
      i++;
      setTimeout(
        () => { this.selectionSortLoop(i) }, 500);
    }
  }
*/

  setSpeed = (evt: ChangeEvent<HTMLInputElement>): void => {
    console.log(typeof(evt.target.value))
    let x = parseInt(evt.target.value)
    this.setState({time: (100-x)*5})
  }
  setAmount = (evt: ChangeEvent<HTMLInputElement>): void => {
    console.log(typeof(evt.target.value))
    let x = parseInt(evt.target.value)
    this.setState({amount: x})
    let numberArr: number[] = [];
    let divArr: JSX.Element[] = [];
    for (let i = 0; i<x; i++)
    {
      numberArr.push((i*2)+10);
    }
    for (let i = 0; i<x; i++)
    {
      divArr.push(
        <span>
          <svg width="10" height={numberArr[i]+5}>
            <rect x="10" y="10" width = "10" height = {numberArr[i]} stroke="black" strokeWidth="5" fill="blue" />
          </svg>
        </span>
      )
    }
    this.setState({poles: numberArr})
    this.setState({poleDivs: divArr});
    let colorArr: JSX.Element[] = [];
    let a: string[] = [];

    let mapKeys = map.keys();
    for (let i = 0; i<x; i++)
    {
      let b = mapKeys.next().value;
      colorArr.push(
        <span>
        <svg width="13" height="100">
          <rect x="1" y="1" rx="1" width = "11" height = "60" stroke="black" strokeWidth="1.5" fill={b} />
        </svg>
      </span>
      )
      a.push(b);
    }
    this.setState({books: a});
    this.setState({bookDivs: colorArr})
  }

  handleGenerateRandom = () => {
    const Colors2 = shuffle(this.state.books);
    this.setState({books: Colors2})
    let bookDivs: JSX.Element[] = [];
    for (let i = 0; i<Colors2.length; i++)
    {
      bookDivs.push(
        <span>
        <svg width="13" height="100">
          <rect x="1" y="1" rx="1" width = "11" height = "60" stroke="black" strokeWidth="1.5" fill={Colors2[i]} />
        </svg>
      </span>
      )
    }
    this.setState({bookDivs: bookDivs})

    const Colors3 = shuffle2(this.state.poles);
    this.setState({poles: Colors3})
    let poleDivs: JSX.Element[] = [];
    for (let i = 0; i<Colors3.length; i++)
    {
      poleDivs.push(
        <span>
          <svg width="10" height={Colors3[i]+5}>
            <rect x="10" y="10" width = "10" height = {Colors3[i]} stroke="black" strokeWidth="5" fill="blue" />
          </svg>
        </span>
      )
    }
    this.setState({poleDivs: poleDivs})
  }
}

