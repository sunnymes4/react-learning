
const BgChanger = ({btnList, bgChange}) => {
  return (
    <>
      <div className='flex flex-wrap mt-5 p-2 rounded-md gap-3 bg-gray-200'>
        {   
            btnList.map(btn => {
                return (
                    <button 
                        key={btn.id}
                        onClick={() => bgChange(btn.color)}
                        style={{backgroundColor: btn.color}}>
                        {btn.name}
                    </button>

                )
            })
        }
      </div>
    </>
  )
}

export default BgChanger
