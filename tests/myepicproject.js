const anchor = require('@project-serum/anchor');

const main = async () => {
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Myepicproject;
  const baseAccount = anchor.web3.Keypair.generate();
  const tx = await program.rpc.initialize({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    },
    signers: [baseAccount],
  });
  console.log("Your transaction signature is ", tx);
  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log(`👀 Gifs count`, account.totalGifs.toString());
  await program.rpc.addGif({
    accounts: {
      baseAccount: baseAccount.publicKey,
    },
  })
  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log(`👀 Gifs count`, account.totalGifs.toString());
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain();

// describe('myepicproject', () => {

//   // Configure the client to use the local cluster.
//   anchor.setProvider(anchor.Provider.env());

//   it('Is initialized!', async () => {
//     // Add your test here.
//     const program = anchor.workspace.Myepicproject;
//     const tx = await program.rpc.initialize();
//     console.log("Your transaction signature", tx);
//   });
// });
