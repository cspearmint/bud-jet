import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Heading from "./Heading"
import './main.css';

//creates a new expense
function ExpenseCard({ isOpen, onClose, onSave }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');

  //saves expense info & resets
  const saveButton = () => {
    onSave(name, date, amount);
    setName('');
    setDate('');
    setAmount('');
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="card-backdrop">
      <div className="card">
        <h2>Create New Expense</h2>
        <label>
          Name of Expense:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Date of Expense:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label>
          Amount:
          <input 
            type="text" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
            placeholder="$  --  "  
          />
        </label>
        <button onClick={saveButton}>Save Expense</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
  }  

//specific category component
function Category({ categoryName, items, onAddExpense }) {
  const [dormChecked, setDormChecked] = useState(true); //sets dormChecked to true and declares setDormChecked as function to update its value

  const renderHousing = () => { //function that returns UI wrapped in housing-content container
    return (
      <div className="housing-content">
        <div className="housing-switch-container">
          <p className="switch-option">{dormChecked ? "Dorm" : "Apartment"}</p> {/*p next to switch, if dormChecked true, then p = "Dorm"*/}
          <Switch
            checked={dormChecked}
            onChange={handleSwitchChange}
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: '#FF684F', 
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: '#FF684F',
              },
            }}
          />
        </div>
        {dormChecked ? (
          <div className = "dormcard-container">
            <p>Semester Cost :</p>
            <input type="text" placeholder="Semester Cost" />
          </div>
        ) : (
          <div className = "apartmentcard-container">
            <div class="item">Rent :</div>
            <div class="item"><input type="text" placeholder="Monthly Rent" /></div>
            <div class="item">Utilities :</div>
            <div class="item"><input type="text" placeholder="Monthly Utilities" /></div>
            <div class="item">Total :</div>
            <div class="item"><input type="text" placeholder="Total" disabled /></div>
          </div>
        )}
        <div className="out-pocket-container">
          <p>Out of Pocket: <span>$some</span></p>
        </div>
        <div className="checkbox-container">
          <input type="checkbox" id="paid-checkbox" name="paid-checkbox" />
          <label htmlFor="paid-checkbox" className="checkbox-label">Paid</label>
        </div>
          
      </div>
    );
  };
  
  const handleSwitchChange = () => {
    setDormChecked(!dormChecked);
  };

  const [data, setData] = useState(items.map(item => item.cost));

  const handleInputChange = (index, value) => {
    const newData = [...data];
    newData[index] = value;
    setData(newData);
  };

    // card function
  const [isCardOpen, setIsCardOpen] = useState(false);
  const handleOpenCard = () => {
    setIsCardOpen(true);
  };
  const handleCloseCard = () => {
    setIsCardOpen(false);
  };

  // saves the new expense in category container 
  const handleSaveExpense = (name, date, amount) => {
    console.log("Saving Expense:", name, date, amount);
    const newExpense = { date, item: name, cost: amount };
    onAddExpense(categoryName, newExpense);
    handleCloseCard();
  };


  return (
    <div className={`${categoryName} category-container`}>
        <Heading text = {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}></Heading>
      
      {items.map((item, index) => (
        <div className='category-item' key={index}>
          {categoryName === 'groceries' || categoryName === 'tuition' || categoryName === 'scholarship' ? (
            <div className = "gts-container">
              <span className={`${categoryName}-date`}>{item.date} :</span>
              <input
                type="text"
                placeholder="$  --  "
                value={data[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className={`category-value ${categoryName}-value`}
              />
            </div>
          ) : (
            <>
              <span className={`${categoryName}-name`}>{item.date}</span> ~
              <span className={`${categoryName}-name`}>{item.item}</span>:
              <span className={`${categoryName}-value`}>{item.cost}</span>
            </>
          )}
        </div>
      ))}
      {(categoryName === 'disposable' || categoryName === 'hobby') && (
        <div className = 'newexpense-container'>
          <div className = 'newexpensebutton-container'>
            <Button 
              onClick={handleOpenCard} 
              variant="contained" 
              style={{
                backgroundColor: '#FF684F',
                color: 'white',
                padding: '10px 30px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                borderRadius: '15px',
                marginTop: '10px',
                cursor: 'pointer',
                alignSelf: 'center',
                '&:hover': {
                backgroundColor: '#F47C7C',}}}>
              Create New Expense
            </Button>
          </div>
          <ExpenseCard 
            isOpen={isCardOpen} 
            onClose={handleCloseCard} 
            onSave={(name, date, amount) => handleSaveExpense(name, date, amount)}
          />
      </div>
      )}
      {categoryName === 'housing' && (
        renderHousing()
      )}

      {(categoryName === 'tuition' || categoryName === 'scholarship') && (
        <>
        <div className="out-pocket-container">
          <p>Out of Pocket: <span>$some</span></p>
        </div>
        <div className="checkbox-container">
          <input type="checkbox" id="paid-checkbox" name="paid-checkbox" />
          <label htmlFor="paid-checkbox" className="checkbox-label">Paid</label>
        </div>
        </>
      )}
    </div>
  );
}

function Main() {
  const stats = {
    total: '$1,234,001.50',
    groceries: '$111.10',
    disposable: '$93.08',
    hobby: '$37.20',
    housing: '$1,000,000',
    tuition: '$3,745',
    scholarship: '$500,000'
  };

  const [categoriesData, setCategoriesData] = useState({
    disposable: [
      { date: '2/8/24', item: 'coffee', cost: '$4.76' },
      { date: '2/7/24', item: 'clothes', cost: '$20.52' },
      { date: '2/6/24', item: 'bike', cost: '$55.55' },
    ],
    groceries: [
      { date: 'Week 1', cost: '' },
      { date: 'Week 2', cost: '' },
      { date: 'Week 3', cost: '' },
      { date: 'Week 4', cost: '' },
    ],
    hobby: [
      { date: '2/8/24', item: 'paint', cost: '$10.76' },
      { date: '2/7/24', item: 'paintbrush', cost: '$2.41' },
      { date: '2/6/24', item: 'canvas', cost: '$5.55' },
    ],
    housing: [
    ],
    tuition: [
      { date: 'Tuition w/ Fees', cost: '$3,670' },
      { date: 'Lab/Class Fees', cost: '$75' },
    ],
    scholarship: [
      { date: 'Tuition', cost: '' },
      { date: 'Lab/Class Fees', cost: '' },
      { date: 'Housing', cost: '' },
    ]
  });
  
    const addExpense = (categoryName, newExpense) => {
    setCategoriesData(prevCategories => ({
      ...prevCategories,
      [categoryName]: [...prevCategories[categoryName], newExpense]
    }));
  };

  const renderStats = () => (
    <div className="current-stats">
      <Heading text = "Current Monthly Stats"></Heading>
      <div className="stats-overview">
        <div className="total-spending">
          <div className="total-text">
            <p>You have spent this much money so far:</p>
          </div>
          <p className="total">{stats.total}</p>
        </div>
        <div className="categories-summary">
          {Object.entries(stats).filter(([key]) => key !== 'total').map(([category, value], index) => (
            <div className="category-stat" key={index}>
              <span className="category-name">{category.charAt(0).toUpperCase() + category.slice(1)} : </span>
            </div>
          ))}
        </div>
      </div>
    </div>


  );

  return (
    <div className="main">
      <div className="main-header-container">
        <p>BudJet</p>
      </div>
      <div className="stats-container">
        {renderStats()}
      </div>
      <div className="categories-container">
        <div className="category-group">
          <Category categoryName="disposable" items={categoriesData.disposable} onAddExpense={addExpense} />
          <Category categoryName="groceries" items={categoriesData.groceries}/>
        </div>
        <div className="category-group">
          <Category categoryName="hobby" items={categoriesData.hobby} onAddExpense={addExpense} />
          <Category categoryName="housing" items={categoriesData.housing}/>
        </div>
        <div className="category-group">
          <Category categoryName="tuition" items={categoriesData.tuition}/>
          <Category categoryName="scholarship" items={categoriesData.scholarship}/>
        </div>
      </div>
    </div>
  );
  
}

export default Main;
