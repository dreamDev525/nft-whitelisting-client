import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { IconContext } from 'react-icons';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';
import ABI from '../config/MoleculeFactoryV2.json';
import rpcConfig from '../config/rpcConfig';
import projectConfig from '../config/projectConfig';
import { useEthereumProvider } from '../hooks/useEthereumProvider';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import { create } from 'domain';
import { Tooltip } from '../components/Tooltip';
import useTableland from '../hooks/useTableland';
import { connect } from '@tableland/sdk';

export default function Borrow() {
  const { account, active, chainId } = useWeb3React();
  const { ethereumProvider } = useEthereumProvider();
  const { createTable, writeQuery, readQuery } = useTableland();
  // const { CONTRACT_ADDRESS, METADATA_URI, METADATA_IMG } = useNftPort();

  const [message, setMessage] = useState('');
  const [connErrMsg, setConnErrMsg] = useState('');

  const [querystatus, setQueryStatus] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isMinting, setIsMinting] = useState(false);

  const [successMsg, setSuccessMsg] = useState('');

  const [showTable, setShowTable] = useState(false);

  const [showTokenList, setShowTokenList] = useState(false);

  const [selectedContract, setSelectedContract] = useState('');

  const [formData, setFormData] = useState('');

  let [items, setItems] = useState([]);
  const [address, setAddress] = useState();

  const tURI = 'QmUFbUjAifv9GwJo7ufTB5sccnrNqELhDMafoEmZdPPng7';
  const tableName = 'molecule_nft_whitelisting_user_request_80001_2040';
  //const tableName = 'molecule_nft_whitelisting_request_80001_2211';'0x93df203b8da82d57113709015d0a9e08a1615df9'

  const uri =
    'https://api.covalenthq.com/v1/80001/address/' +
    account +
    '/balances_v2/?quote-currency=USD&format=JSON&nft=false&no-nft-fetch=false&key=ckey_d452e85367ae400b874ea3bdd3b';
  const getTokens = async () => {
    console.log(account);
    // const uri =
    //   'https://api.covalenthq.com/v1/1/address/' +
    //   account +
    //   '/balances_v2/?quote-currency=USD&format=JSON&nft=false&no-nft-fetch=false&key=ckey_d452e85367ae400b874ea3bdd3b';
    fetch(uri)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.data.items);
        setItems(data.data.items);
        setIsPending(false);
      })
      .catch((err) => {
        console.error(err);
        setIsPending(false);
      });
    //setIsPending(false);
  };

  const getTokenss = async () => {
    console.log(account);
    const uri =
      'https://api.covalenthq.com/v1/1/address/' +
      address +
      '/balances_v2/?quote-currency=USD&format=JSON&nft=false&no-nft-fetch=false&key=ckey_d452e85367ae400b874ea3bdd3b';
    fetch(uri)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.data.items);
        setItems(data.data.items);
        setIsPending(false);
      })
      .catch((err) => {
        console.error(err);
        setIsPending(false);
      });
    //setIsPending(false);
  };

  useEffect(() => {
    if (!active) {
      setConnErrMsg('Not connected to your wallet.');
    } else {
      if (chainId !== projectConfig.chainId) {
        setConnErrMsg(`Change the network to ${projectConfig.networkName}.`);
      } else {
        setConnErrMsg('');
        setIsPending(true);
        getTokens();
      }
    }
  }, [account, active, chainId]);

  return (
    <>
      <Layout>
        <div className="h-screen overflow-y-auto overflow-x-auto overflow-auto">
          <div className="flex flex-row justify-center items-center gap-2">
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 w-1/3 justify-center items-center text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Address"
              required
              onChange={(e) => setAddress(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#2D3648] w-40 text-white  font-normal focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => {
                getTokenss();
                setIsPending(true);
              }}
            >
              Search
            </button>
          </div>
          <div className="">
            {active && !connErrMsg ? (
              <>
                {isPending || isMinting ? (
                  <div className="flex flex-col justify-center items-center">
                    <button
                      type="button"
                      className="flex justify-center items-center rounded px-4 py-2 bg-sidebar_user font-bold w-60 cursor-not-allowed text-white text-2xl font-titans_fw_600 font-auto mt-48"
                    >
                      <svg
                        className="animate-spin -ml-1 mr-3 h-10 w-10 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {isPending && 'Requesting'}
                      {isMinting && 'Creating'}
                      {!isPending && !isMinting && 'Processing'}
                    </button>
                  </div>
                ) : (
                  <>
                    {/* {uri} */}
                    {items.length > 0 ? (
                      <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3 p-12">
                        {items.map((curlem, index) => {
                          return (
                            <div key={index} className="relative">
                              <div className="px-2">
                                <div className="flex h-8 w-full rounded-t-lg border-b-2 border-gray-900 bg-[#CBD2E0] pl-[90px] shadow-lg">
                                  <small className="my-auto items-center text-xs font-normal tracking-tight text-black">
                                    {curlem.contract_ticker_symbol}
                                  </small>
                                </div>
                              </div>
                              <div className="flex h-12 w-full rounded-lg bg-[#2D3648] pl-[98px] shadow-xl">
                                <small className="my-auto text-lg font-bold text-white">
                                  {curlem.balance /
                                    Math.pow(10, curlem.contract_decimals)}
                                </small>
                              </div>
                              <div className="absolute top-2 left-6 h-16 w-16 rounded-full border-2 border-white shadow-md">
                                <img
                                  className="rounded-full object-cover object-center"
                                  src={curlem.logo_url}
                                  alt=""
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <>
                        {isPending ? (
                          <button
                            type="button"
                            className="flex justify-center items-center rounded px-4 py-2 bg-sidebar_user font-bold w-40 cursor-not-allowed"
                          >
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            {isPending && 'Pending'}
                          </button>
                        ) : (
                          <div className="flex flex-col justify-center items-center mt-24">
                            {account}
                            <img className="" src="createcontract.svg"></img>
                            <button className="h-10 w-1/4 text-center font-weight:900 text-auto font-titans_fw_600 font-auto text-2xl rounded-lg text-xl  bg-sidebar_user text-white ">
                              Please Reload Page
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                {connErrMsg && (
                  <div className="h-screen overflow-y-auto overflow-x-auto overflow-auto">
                    <div className="flex flex-col justify-center items-center">
                      <button
                        type="button"
                        className="flex justify-center items-center rounded px-4 py-2 bg-sidebar_user font-bold w-80 cursor-not-allowed text-white text-2xl font-titans_fw_600 font-auto mt-48"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          ></path>
                        </svg>{' '}
                        {connErrMsg}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {successMsg && <h2>{successMsg}</h2>}

          {message && (
            <div className="text-green-500 text-center">{message}</div>
          )}
          {/* {connErrMsg && (
            <div className="text-red-500 text-center">{connErrMsg}</div>
          )} */}
        </div>
        {/* <div className="text-gray-400 mt-2">{account}</div>
        <div className="text-gray-400 mt-2">
          Please make sure you are connected to the correct address and the
          correct network ({projectConfig.networkName}).
        </div> */}
      </Layout>
    </>
  );
}
