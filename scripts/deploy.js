const hre = require("hardhat");

(async () => {
  try {
    const TimeReserveNote = await hre.ethers.deployContract("TimeReserveNote");
    await TimeReserveNote.waitForDeployment();
    console.log(`TimeReserveNote is deployed to ${TimeReserveNote.target}`);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
})();

