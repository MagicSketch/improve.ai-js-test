var purchase_funnel = [
  "Index",
  "Purchase",
  "Succeed",
];
var headline_choices = [
  "A", "B",
];
improveai.choose("headline", headline_choices, purchase_funnel, function(data, status) {

  if (status >= 200 && status < 400) {
    console.log("choose completed: ");
    console.log(data);
    headline = JSON.parse(data).properties.headline;
  } else {
    headline = "Error Loading POST /v1/choose";
  }

  document.getElementById("headline").innerHTML = headline;
});
