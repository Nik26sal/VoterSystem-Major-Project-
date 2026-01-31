const Voting = await ethers.getContractFactory("Voting");
const voting = await Voting.deploy(); // ⭐ no arguments

await voting.deployed();

console.log("Contract deployed to:", voting.address);
