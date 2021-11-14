import React, { Fragment, useState, useEffect } from 'react'
import 'h8k-components'

import { image1, image2, image3, image4 } from './assets/images'
import { Thumbs, Viewer } from './components'
import useIntervalCustom from './components/CustomHooks/useIntervalCustom';

const title = 'Catalog Viewer'

function App() {
  const catalogsList = [
    {
      thumb: image1,
      image: image1
    },
    {
      thumb: image2,
      image: image2
    },
    {
      thumb: image3,
      image: image3
    },
    {
      thumb: image4,
      image: image4
    }
  ]

  const [catalogs] = useState([...catalogsList])
  const [activeIndex, setActiveIndex] = useState(0)
  const [slideTimer, setSlideTimer] = useState(null)
  const [slideDuration] = useState(3000)
  let timer;
  const slideMoveLeft = () => {

    if (activeIndex === 0) {

      setActiveIndex(3)
    } else {
      let newVal = activeIndex - 1;
      setActiveIndex(newVal)
    }
  }
  const slideMoveRight = () => {

    if (activeIndex === 3) {

      setActiveIndex(0)
    } else {
      let newVal = activeIndex + 1;
      setActiveIndex(newVal)
    }
  }
  const setSpanId = (param) => {
    setActiveIndex(param);
  }
  const _handleChange = (e) => {
    console.log(e.target.checked);
    let checked = e.target.checked;
    let a = 1;
    useIntervalCustom(() => {
      if (checked) {
        console.log('runing ' + activeIndex);
        if (activeIndex > 3) {
          console.log('aaaa');
          // a = 0;
          setActiveIndex(prev => prev)
        } else {
          setActiveIndex(prev => prev + 1)
          
        }
        // a++;
      }
    }, slideDuration)

  }

  useEffect(() => {
    console.log(activeIndex)
    // return () => {
    //   clearInterval(timer);
    // }
  }, [activeIndex])
  

  return (
    <Fragment>
      <h8k-navbar header={title}></h8k-navbar>
      <div className='layout-column justify-content-center mt-75'>
        <div className='layout-row justify-content-center'>
          <div className='card pt-25'>
            <Viewer catalogImage={catalogs[activeIndex].image} />
            <div className='layout-row justify-content-center align-items-center mt-20'>
              <button
                className="icon-only outlined"
                data-testid="prev-slide-btn"
                onClick={slideMoveLeft}
              >
                <i className="material-icons">arrow_back</i>
              </button>
              <Thumbs
                items={catalogs}
                currentIndex={activeIndex}
                setSpanId={setSpanId}
              />
              <button
                className="icon-only outlined"
                data-testid="next-slide-btn"
                onClick={slideMoveRight}
              >
                <i className="material-icons">arrow_forward</i>
              </button>
            </div>
          </div>
        </div>
        <div className='layout-row justify-content-center mt-25'>
          <input
            type='checkbox'
            data-testid='toggle-slide-show-button'
            onChange={_handleChange}
          />
          <label className='ml-6'>Start Slide Show</label>
        </div>
      </div>
    </Fragment>
  )
}

export default App

