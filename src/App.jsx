import { useState } from 'react';
import './App.css';

function App() {
  const [val, setVal] = useState('');
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);

  const getVal = (e) => {
    setVal(e.target.value);
  };

  async function fetchData(e) {
    e.preventDefault();
    if (!val) return;
    setHasSearched(true);

    const Token = 'rb5Wcel1i9ev7KQpqFucLTec1_wNTdWbeBOx0GeGgkc';
    let response = await fetch(
      `https://api.unsplash.com/search/photos?query=${val}&client_id=${Token}&page=${page}&per_page=10`
    );
    let data = await response.json();

    setResult(data.results);
    setTotalPages(Math.ceil(data.total / 10)); 
    console.log(data);
  }

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
      fetchDataForPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
      fetchDataForPage(page - 1); 
    }
  };

  const fetchDataForPage = async (pageNumber) => {
    const Token = 'rb5Wcel1i9ev7KQpqFucLTec1_wNTdWbeBOx0GeGgkc';
    let response = await fetch(
      `https://api.unsplash.com/search/photos?query=${val}&client_id=${Token}&page=${pageNumber}&per_page=10`
    );
    let data = await response.json();
    setResult(data.results);
  };

  return (
    <div className='container'>
      <form onSubmit={fetchData} className='input-box'>
        <input
          type="text"
          placeholder='Enter a value...'
          onChange={getVal}
          className='input'
          value={val}
        />
        <button type='submit' className='submit-button'>Search</button>
      </form>
      
      <div className='main-box'>
        {
          result.length > 0 ? (
            result.map((image) => (
              <div key={image.id} className='box'>
                <div className='user-box'>
                  <img src={image.user.profile_image.medium} alt={image.alt_description} className='user-img'/>
                  <span className='user-name'>{image.user.name}</span>
                </div>
                <img src={image.urls.regular} alt={image.alt_description} className='image'/>
                <span className='img-dec'>{image.alt_description}</span>
              </div>
            ))
          ) : (
            hasSearched && result.length === 0 && ( 
            <span className={result.length === 0 ? 'error-msg' : 'no-result'}>
              No Result Found...!
            </span>
          ))
        }
      </div>

      <div className={result.length>0?'pagination':'no-result'}>
        <button onClick={handlePrev} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={handleNext} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
