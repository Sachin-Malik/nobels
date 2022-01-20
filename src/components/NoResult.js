import React from 'react'

function NoResult() {
    return (
        <div >
            <p className='text-center m-5'>Oops... looks like we don't have that.</p>
            <div className='row justify-content-center'>
            <div className='col-6 text-center'>
              <div className="mx-auto no-result "></div>
            </div>
            </div>
        </div>
    )
}

export default NoResult
