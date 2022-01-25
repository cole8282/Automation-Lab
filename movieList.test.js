// Lines 2 through 6 are our boilerplate lines of code, we need them for our tests to work
const {Builder, Capabilities} = require('selenium-webdriver')
const { By } = require('selenium-webdriver')

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

// First we're going to navigate to navigate to our MovieList port
beforeAll(async () => {
    await driver.get('http://127.0.0.1:5501/movieList/index.html')
})

// And after our test has completed, we want to close our browser
afterAll(async () => {
    await driver.quit()
})


//Test functions
test("Add movie to the list", async () => {
  //we need to access the input field
  await driver.findElement(By.xpath('//input')).sendKeys('Fellowship Of The Ring');
  //using XPath, select the button element and click
  await driver.findElement(By.xpath('//button')).click();

  //Using xpath again, let's try to finding the element rendered
  const movie = await driver.findElement(By.xpath('//li'));
  const displayed = movie.isDisplayed();

  //Let's check to see if the li element is actually displayed
  expect(displayed).toBeTruthy();
    //Add a .sleep() to display results for longer
    await driver.sleep(4000);
});


test("Crossing off a movie from the list", async () => {
  //We need to access the movie title in the list
  const movie = await driver.findElement(By.xpath('//li'));
  //click on the movie to cross it off
  const span = await driver.findElement(By.xpath('//li/span'));
  await span.click();

  //test to see if it was clicked
  const checked = await driver.findElement(By.xpath('//li/span[@class="checked"]'));
  const displayed = checked.isDisplayed();
  expect(displayed).toBeTruthy();
  //add a sleep to display results for longer
  await driver.sleep(2000);
});


test("Delete a movie from the list", async () => {
  //a wait in between the tests
  await driver.sleep(2000);
  //we need to access the remove button
  let removeButton = await driver.findElements(By.xpath('//*[text()="x"]'));
  //click the remove button
  await removeButton[0].click();
  // const displayed = await removeButton.isDisplayed();
  //Let's check to see if the element is actually NOT displayed
  let removeButtonOne = await driver.findElements(By.xpath('//*[text()="x"]'));
  expect(removeButtonOne).toHaveLength(0);

  //Add a .sleep() to display results for longer
  await driver.sleep(2000);
});