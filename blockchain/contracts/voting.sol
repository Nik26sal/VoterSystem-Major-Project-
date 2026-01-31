// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Voting {

    // eventId => candidateId => votes
    mapping(uint => mapping(uint => uint)) public votes;

    // eventId => voterAddress => hasVoted
    mapping(uint => mapping(address => bool)) public hasVoted;

    function vote(
        uint eventId,
        uint candidateId,
        address voter
    ) public {
        require(!hasVoted[eventId][voter], "Already voted");

        hasVoted[eventId][voter] = true;
        votes[eventId][candidateId]++;
    }

    function getVotes(uint eventId, uint candidateId) public view returns (uint) {
        return votes[eventId][candidateId];
    }
}
