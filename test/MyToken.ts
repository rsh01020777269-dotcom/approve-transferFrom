const { expect } = require("chai");
const { ethers } = require("hardhat");

describe (function () {
  let mtToken;
  let signer0; 
  let signer1;

  const TEST_AMOUNT = ethers.parseEther("1000");

  beforeEach(async function () {
    [signer0, signer1] = await ethers.getSigners();

    const MTTokenFactory = await ethers.getContractFactory("approve-transferfrom");
    mtToken = await MTTokenFactory.deploy();
    await mtToken.waitForDeployment();


    const approveTx = await mtToken.connect(signer0).approve(signer1.address, TEST_AMOUNT);
    await approveTx.wait();

    const currentAllowance = await mtToken.allowance(signer0.address, signer1.address);
    expect(currentAllowance).to.equal(TEST_AMOUNT);

    const signer1Balance = await mtToken.balanceOf(signer1.address);

    expect(signer1Balance).to.equal(TEST_AMOUNT);
  });
});
