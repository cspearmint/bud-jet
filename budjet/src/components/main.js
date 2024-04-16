import React, { useState, useEffect } from 'react';
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
  const [budget, setBudget] = useState(250); // holds budget

  //calculate budget - totalExpenses
  const totalExpenses = items.reduce((total, item) => {
    return total + parseFloat(item.cost.replace(/[$,]/g, '') || 0);
  }, 0);
  const roundedExpenseTotal = `$${totalExpenses.toFixed(2)}`;
  const roundedBudget = `$${(budget - totalExpenses).toFixed(2)}`;

  const [dormChecked, setDormChecked] = useState(true); //sets dormChecked to true and declares setDormChecked as function to update its value
  
  //HOUSING EXPENSES 
  const [dormCost, setDormCost] = useState('');
  const [rent, setRent] = useState('');
  const [utilities, setUtilities] = useState('');
  const [outOfPocket, setOutOfPocket] = useState('');
  const handleSwitchChange = () => setDormChecked(!dormChecked);

  //TUTION EXPENSES
  const [tuition, setTuition] = useState('');
  const [fees, setFees] = useState('');
  const [tutionOutOfPocket, setTuitionOutOfPocket] = useState('');

  //SCHOLARSHIP EXPENSES
  const [tuitionScholar, setTuitionScholar] = useState('');
  const [feesScholar, setFeesScholar] = useState('');
  const [housingScholar, sethousingScholar] = useState('');
  const [totalScholar, setTotalScholar] = useState('');

//calculates housing out of pocket 
const calculateOutOfPocket = () => {
  if (dormChecked) {
    setOutOfPocket(parseFloat(dormCost).toFixed(2));
  } else {
    const total = parseFloat(rent) + parseFloat(utilities);
    setOutOfPocket(total.toFixed(2)); 
  }
};

//tuition out of pocket
const calculateTuition = () => {
  const totalTuitionFees = parseFloat(tuition || 0) + parseFloat(fees || 0);
  const totalScholarships = parseFloat(tuitionScholar || 0) + parseFloat(feesScholar || 0);
  const outOfPocket = totalTuitionFees - totalScholarships;
  setTuitionOutOfPocket(outOfPocket.toFixed(2));  
};


//scholarship total 
const calculateScholarship = () => {
  const total = parseFloat(tuitionScholar || 0) + parseFloat(feesScholar || 0) + parseFloat(housingScholar || 0);
  console.log("Calculating total scholarship:", total); // Log to see if the function is called
  setTotalScholar(total.toFixed(2));
}






const renderHousing = () => {
  return (
    <div className="housing-content">
      <div className="housing-switch-container">
        <p className="switch-option">{dormChecked ? "Dorm" : "Apartment"}</p>
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
        <div className="dormcard-container">
          <p>Semester Cost:</p>
          <input
            type="text"
            placeholder="Semester Cost"
            value={dormCost}
            onChange={e => setDormCost(e.target.value)}
          />
        </div>
      ) : (
        <div className="apartmentcard-container">
          <div className="item">Rent:</div>
          <input
            type="text"
            placeholder="Monthly Rent"
            value={rent}
            onChange={e => setRent(e.target.value)}
          />
          <div className="item">Utilities:</div>
          <input
            type="text"
            placeholder="Monthly Utilities"
            value={utilities}
            onChange={e => setUtilities(e.target.value)}
          />
          <div className="item">Total:</div>
          <input
            type="text"
            placeholder="Total"
            value={parseFloat(rent || 0) + parseFloat(utilities || 0)}
            disabled
          />
        </div>
      )}
      <div className="out-pocket-container">
        <Button 
          onClick={calculateOutOfPocket}
          variant="contained"
          style={{
            backgroundColor: '#FF684F',
            color: 'white',
            padding: '5px 15px',
            fontSize: '1rem',
            fontWeight: 'bold',
            borderRadius: '15px',
            marginTop: '40px',
            cursor: 'pointer',
            alignSelf: 'center',
            '&:hover': { backgroundColor: '#F47C7C'},
          }}>
          Calculate Out of Pocket =
        </Button>
        <span>{`$${outOfPocket}`}</span>
      </div>
      <div className="checkbox-container">
        <input type="checkbox" id="paid-checkbox" name="paid-checkbox" />
        <label htmlFor="paid-checkbox" className="checkbox-label">Paid</label>
      </div>
    </div>
  );
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
        {(categoryName === 'disposable' || categoryName === 'hobby' || categoryName === 'groceries') && (
      <div className={`category-total ${categoryName}-total totalExpense`}>
      <div>${budget} - {roundedExpenseTotal} =</div>
      <div className='remainingBudget'>{roundedBudget}</div>
      </div>
    )}

      
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

      {(categoryName === 'disposable' || categoryName === 'hobby') &&(
        
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
            onSave={handleSaveExpense}
          />
      </div>
      )}
      {categoryName === 'groceries' && (
        <div className="out-pocket-container">
        <Button 
          onClick={calculateTuition}
          variant="contained"
          style={{
            backgroundColor: '#FF684F',
            color: 'white',
            padding: '5px 15px',
            fontSize: '1rem',
            fontWeight: 'bold',
            borderRadius: '15px',
            marginTop: '30px',
            cursor: 'pointer',
            alignSelf: 'center',
            '&:hover': { backgroundColor: '#F47C7C'},
          }}>
          Calculate!
        </Button>
      </div>
      )}

      {categoryName === 'housing' && (
        renderHousing()
      )}

      {categoryName === 'tuition' ? (
        <div className="tuition-details">
        <div className="tuition-container">
          <div className="item">Tuition w/ Fees:</div>
          <input
            type="text"
            placeholder="Enter Tuition"
            value={tuition}
            onChange={e => setTuition(e.target.value)}
          />
          <div className="item">Lab/Class Fees:</div>
          <input
            type="text"
            placeholder="Additional fees"
            value={fees}
            onChange={e => setFees(e.target.value)}
          />
          <div className="item">Total:</div>
          <input
            type="text"
            placeholder="Total"
            value={parseFloat(tuition || 0) + parseFloat(fees || 0)}
            disabled
          />
        </div>
        <div className="out-pocket-container">
          <Button 
            onClick={calculateTuition}
            variant="contained"
            style={{
              backgroundColor: '#FF684F',
              color: 'white',
              padding: '5px 15px',
              fontSize: '1rem',
              fontWeight: 'bold',
              borderRadius: '15px',
              marginTop: '30px',
              cursor: 'pointer',
              alignSelf: 'center',
              '&:hover': { backgroundColor: '#F47C7C'},
            }}>
            Calculate Out of Pocket =
          </Button>
          <span>{`$${tutionOutOfPocket}`}</span>
        </div>
        <div className="checkbox-container">
          <input type="checkbox" id="paid-checkbox" name="paid-checkbox" />
          <label htmlFor="paid-checkbox" className="checkbox-label">Paid</label>
        </div>
        </div>
      ) : null}
      
      {categoryName === 'scholarship' ? (
        <div className="scholarship-details">
        <div className="scholarship-container">
          <div className="item">Tuition w/ Fees:</div>
          <input
            type="text"
            placeholder="Enter Tuition"
            value={tuitionScholar}
            onChange={e => setTuitionScholar(e.target.value)}
          />
          <div className="item">Lab/Class Fees:</div>
          <input
            type="text"
            placeholder="Additional fees"
            value={feesScholar}
            onChange={e => setFeesScholar(e.target.value)}
          />
          <div className="item">Housing:</div>
          <input
            type="text"
            placeholder="Enter Housing Costs"
            value={housingScholar}
            onChange={e => sethousingScholar(e.target.value)}
          />
        </div>
        <div className="out-pocket-container">
          <Button 
            onClick={calculateScholarship}
            variant="contained"
            style={{
              backgroundColor: '#FF684F',
              color: 'white',
              padding: '5px 15px',
              fontSize: '1rem',
              fontWeight: 'bold',
              borderRadius: '15px',
              marginTop: '30px',
              cursor: 'pointer',
              alignSelf: 'center',
              '&:hover': { backgroundColor: '#F47C7C'},
            }}>
            Total Scholarship = 
          </Button>
          <span>{`$${totalScholar}`}</span>
        </div>
        <div className="checkbox-container">
          <input type="checkbox" id="paid-checkbox" name="paid-checkbox" />
          <label htmlFor="paid-checkbox" className="checkbox-label">Paid</label>
        </div>
        </div>
      ) : null}
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
      { date: '2024-08-24', item: 'coffee', cost: '$4.76' },
      { date: '2024-07-24', item: 'clothes', cost: '$20.52' },
      { date: '2024-02-24', item: 'bike', cost: '$55.55' },
    ],
    groceries: [
      { date: 'Week 1', cost: '$20.43' },
      { date: 'Week 2', cost: '$64.34' },
      { date: 'Week 3', cost: '$35.29' },
      { date: 'Week 4', cost: '' },
    ],
    hobby: [
      { date: '2024-08-24', item: 'paint', cost: '$10.76' },
      { date: '2024-07-17', item: 'paintbrush', cost: '$2.41' },
      { date: '2024-02-03', item: 'canvas', cost: '$5.55' },
    ],
    housing: [
    ],
    tuition: [
    ],
    scholarship: [
    ]
  });

    // compute total expenses for each category for summary
    const categoryTotals = Object.keys(categoriesData).reduce((totals, category) => {
      const total = categoriesData[category].reduce((sum, item) => sum + parseFloat(item.cost.replace(/[$,]/g, '')), 0);
      totals[category] = `$${total.toFixed(2)}`;
      return totals;
    }, {});

    //checks if expenses being logged 
    useEffect(() => {
      console.log("Updated categories data:", categoriesData);
    }, [categoriesData]);
  
    const addExpense = (categoryName, newExpense) => {
      setCategoriesData(prevCategories => ({
        ...prevCategories,
        [categoryName]: [newExpense, ...prevCategories[categoryName]]
      }));
    };
    
  

  const renderStats = (categoryTotals) => (
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
          {Object.entries(categoryTotals).map(([category, total], index) => (
            <div className="category-stat" key={index}>
              <span className="category-name">{category.charAt(0).toUpperCase() + category.slice(1)}:</span>
              <span className="category-value">{total}</span>
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
        {renderStats(categoryTotals)}
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