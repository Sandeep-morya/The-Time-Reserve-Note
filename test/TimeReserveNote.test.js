const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Time Reserve Note", function () {

  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const TimeReserveNote = await ethers.getContractFactory("TimeReserveNote");
    const timeReserveNoteContract = await TimeReserveNote.deploy();
  }

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {

    });
  });

});
