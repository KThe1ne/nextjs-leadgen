import React from 'react'

const OptInPage = () => {
  return (
    <div className='w-full h-[calc(100vh-4rem) flex flex-row justify-center items-center p-6'>
        <div className='w-[1360px] h-auto'>
            <h1 className='text-[#102F54] font-bold text-center text-[60px] mb-3'>Lorem Ipsum</h1>
            <h2 className='text-[#102F54] font-semibold text-[26px] leading-9 text-center mb-9'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non tortor nulla.</h2>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(200px,_1fr))] w-full h-full border-2 border-[#102F54] rounded-lg overflow-hidden'>
                <div className='bg-[#102F54] h-96'>
                    
                </div>
                <div className='h-96 p-10'>
                    <h2 className='text-[#102F54] font-semibold text-[26px] leading-9 text-center mb-9 '>Big Business Lead Magnets</h2>
                    <button className='bg-[#059C65] w-full p-[12px_24px] rounded-md text-base'>Send Me The Guide</button>
                    <p className='mt-3 text-xs text-[#0C8BBB]'>We respect your privacy. Unsubscribe at anytime.</p>
                </div>
                {/* <div className='bg-red-500 w-full'></div> */}
            </div>
        </div>
    </div>
  )
}

export default OptInPage