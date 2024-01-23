import { useState, useEffect } from 'react'
import InputBox from './components/InputBox'
import useCurrency from './hooks/useCurrency'
import './App.css'

function App() {
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('inr');
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrency(from);
  const curOptions = Object.keys(currencyInfo);

  const swap = () => {
    setTo(from);
    setFrom(to);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  }

  const convertAmount = () => {
    setConvertedAmount(amount* currencyInfo[to])
  }


  return (
    <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/2884498/pexels-photo-2884498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convertAmount()
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount}
                                amountChange={(amt) => setAmount(amt)}
                                selectedCurrency={from}
                                currencyChange={(from) => setFrom(from)}
                                currencyOptions={curOptions}
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                              label="To"
                              amount={convertedAmount}
                              amountChange={(amt) => setAmount(amt)}
                              selectedCurrency={to}
                              currencyChange={(to) => setTo(to)}
                              currencyOptions={curOptions}
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                            Convert {from.toUpperCase()} to {to.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default App
