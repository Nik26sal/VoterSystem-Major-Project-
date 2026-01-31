const { ethers } = require("ethers");
require("dotenv").config();
const abi = require("../VotingABI.json");

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY, provider);

const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  abi,
  wallet
);

async function castVoteOnChain(eventId, candidateId, voterAddress) {
  const tx = await contract.vote(eventId, candidateId, voterAddress);
  await tx.wait();
  return tx.hash;
}


// async function getVotes(candidateId) {
//   return await contract.getVotes(candidateId);
// }

async function getVotesFromChain(eventId, candidateId) {
  const votes = await contract.getVotes(eventId, candidateId);
  return Number(votes);
}

module.exports = { castVoteOnChain, getVotesFromChain };
