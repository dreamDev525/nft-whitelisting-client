const projectConfig = {
  nftName: 'Molecule',

  nftSymbol: 'MOLECULE',

  maxSupply: 100,

  maxMintAmountPerTxn: 10,

  mintCost: process.env.NODE_ENV === 'production' ? 0.01 : 0.01,

  networkName:
    process.env.NODE_ENV === 'production'
      ? 'Mumbai Testnet' // 'Ethereum Mainnet'
      : 'Mumbai Testnet', // 'Rinkeby Testnet'

  chainName: 'MATIC', // 'ETH'

  chainId: process.env.NODE_ENV === 'production' ? 80001 : 80001, // Ethereum (1), Rinkeby (4)

  siteDomain: 'www.yourdomain.com',

  siteUrl:
    process.env.NODE_ENV === 'production'
      ? `http://localhost:3000`
      : 'http://localhost:3000',

  openseaCollectionUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://opensea.io/collection/your_opensea_collection_name'
      : 'https://testnets.opensea.io/collection/your_opensea_collection_name',

  contractAddress:
    process.env.NODE_ENV === 'production'
      ? '0xD1b8A007Af1B82b95C7A871bB037992A214685a5'
      : '0xD1b8A007Af1B82b95C7A871bB037992A214685a5',

  scanUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://mumbai.polygonscan.com/address/0xD1b8A007Af1B82b95C7A871bB037992A214685a5'
      : 'https://mumbai.polygonscan.com/address/0xD1b8A007Af1B82b95C7A871bB037992A214685a5',
  // 'https://etherscan.io/address/your_ethereum_contract_address'
  // 'https://rinkeby.etherscan.io/address/your_rinkeby_contract_address'

  address:
    process.env.NODE_ENV === 'production'
      ? '0x1a90b23ddA44D54fEfA3759BCC531C03f3F67B8d'
      : '0x1a90b23ddA44D54fEfA3759BCC531C03f3F67B8d',
};

export default projectConfig;
