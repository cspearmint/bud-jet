import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import './main.css';

function ExpenseCard({ isOpen, onClose, onSave }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');

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
          <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <button onClick={() => onSave(name, date, amount)}>Save Expense</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}


function Category({ categoryName, items }) {
  const [dormChecked, setDormChecked] = useState(true); 

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
          <>
            <p>Semester Cost:</p>
            <input type="text" placeholder="Semester Cost" />
            <p>Scholarship:</p>
            <input type="text" placeholder="Scholarship" />
          </>
        ) : (
          <>
            <p>Rent:</p>
            <input type="text" placeholder="Monthly Rent" />
            <p>Utilities:</p>
            <input type="text" placeholder="Utilities" />
            <p>Total:</p>
            <input type="text" placeholder="Total" disabled />
          </>
        )}
        <div className="out-pocket-container">
          <p>Out of Pocket:</p>
          <div className="checkbox-container">
            <input type="checkbox" id="paid-checkbox" name="paid-checkbox" />
            <label htmlFor="paid-checkbox" className="checkbox-label">Paid</label>
          </div>
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

  // saves the new expense?
  const handleSaveExpense = (name, date, amount) => {
    console.log("Saving Expense:", name, date, amount);
    handleCloseCard();
  };


  return (
    <div className={`${categoryName} category-container`}>
      <h1 className={`${categoryName}-header`}>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h1>
      {items.map((item, index) => (
        <div className='category-item' key={index}>
          {categoryName === 'groceries' || categoryName === 'tuition' || categoryName === 'scholarship' ? (
            <>
              <span className={`${categoryName}-date`}>{item.date}</span> ~ <span>{item.item}</span>:
              <input
                type="text"
                placeholder="$  --  "
                value={data[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className={`category-value ${categoryName}-value`}
              />
            </>
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
        <>
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
            backgroundColor: '#F47C7C',
          }}
        }
        >
          Create New Expense
        </Button>
        <ExpenseCard 
          isOpen={isCardOpen} 
          onClose={handleCloseCard} 
          onSave={handleSaveExpense}
        />
      </>
      )}
      {categoryName === 'housing' && (
        renderHousing()
      )}

      {(categoryName === 'tuition' || categoryName === 'scholarship') && (
        <>
          <p className={`outPocket`}>Out of pocket:</p>
          <div className="checkbox-container">
            <input type="checkbox" id={`${categoryName}-checkbox`} name={`${categoryName}-checkbox`} />
            <label htmlFor={`${categoryName}-checkbox`} className="checkbox-label">Paid</label>
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

  const categoriesData = {
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
  };

  const renderStats = () => (
    <div className="current-stats">
      <div className="stats-title">Current Monthly Stats</div>
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
              <span className="category-name">{category.charAt(0).toUpperCase() + category.slice(1)}:</span>
            </div>
          ))}
        </div>
      </div>
    </div>


  );

  return (
    <div className="main">
      <header className="main-header">
        BudJet
      </header>
      <div className="stats-container">
        {renderStats()}
        <div className="categories-container">
          <div className="category-group">
            <Category categoryName="disposable" items={categoriesData.disposable} />
            <Category categoryName="groceries" items={categoriesData.groceries} />
          </div>
          <div className="category-group">
            <Category categoryName="hobby" items={categoriesData.hobby} />
            <Category categoryName="housing" items={categoriesData.housing} />
          </div>
          <div className="category-group">
            <Category categoryName="tuition" items={categoriesData.tuition} />
            <Category categoryName="scholarship" items={categoriesData.scholarship} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
