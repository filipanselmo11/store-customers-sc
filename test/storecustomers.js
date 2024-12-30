const StoreCustomers = artifacts.require("StoreCustomers");

contract("StoreCustomers", (accounts) => {
  let contract;

  beforeEach(async () => {
    contract = await StoreCustomers.new();
  });

  it("Add Customer", async () => {
    await contract.addCustomer("Fílip", 27, "filip@example.com");

    const count = await contract.count();
    assert(count.toNumber() === 1, "Couldn't add the customer");
  });

  it("Get Customer", async () => {
    await contract.addCustomer("Fílip", 27, "filip@example.com");
    const customer = await contract.getCustomer(1);
    assert(customer.name === "Fílip", "Couldn't add the customer.");
  });

  it("Edit Customer", async () => {
    await contract.addCustomer("Fílip", 27, "filip@example.com");
    await contract.editCustomer(1, "Jonas", 0);

    const customer = await contract.getCustomer(1);
    assert(customer.name === "Jonas" && customer.age === 34, "Couldn't edit the customer.");
  });

  it("Remove Customer", async () => {
    await contract.addCustomer("Fílip", 27, "filip@example.com");
    await contract.deleteCustomer(1, { from: accounts[0] });

    const count = await contract.count();
    assert(count.toNumber() === 0, "Couldn't delete the customer.");
  });
});