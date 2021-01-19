using System.Collections.Generic;
using System.IO;
using System.Web.Mvc;
using Newtonsoft.Json.Linq;
using ShoppingList_VS.Models;
using ShoppingList_VS.ViewModels;

namespace ShoppingList_VS.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var viewModel = new IndexViewModel()
            {
                CurrentList = new CurrentList(),
                PreviousList = new PreviousList(),
            };

            List<ListItem> CurrentItems = new List<ListItem>();

            List<ListItem> PreviousItems = new List<ListItem>();
            PreviousItems.Add(new ListItem { Id = 1, Name = "Bananas", Index = 1, HighPriority = false });
            PreviousItems.Add(new ListItem { Id = 2, Name = "Biscuits", Index = 2, HighPriority = false });
            PreviousItems.Add(new ListItem { Id = 3, Name = "Bread", Index = 3, HighPriority = false });
            PreviousItems.Add(new ListItem { Id = 4, Name = "Cereal", Index = 4, HighPriority = false });
            PreviousItems.Add(new ListItem { Id = 5, Name = "Milk", Index = 5, HighPriority = false });
            PreviousItems.Add(new ListItem { Id = 6, Name = "Sugar", Index = 6, HighPriority = false });
            PreviousItems.Add(new ListItem { Id = 7, Name = "Tea Bags", Index = 7, HighPriority = false });

            //Makes the viewmodel properties equal to the populated lists
            viewModel.CurrentList.Items = CurrentItems;
            viewModel.PreviousList.Items = PreviousItems;

            JObject obj = (JObject) JToken.FromObject(viewModel);
            CreateFile(obj);

            return View();
        }

        private void CreateFile(JObject obj)
        {
            var filename = "List.json";
            var test = Server.MapPath("~/Content");
            var path = Path.Combine(test, filename);
            System.IO.File.WriteAllText(path, obj.ToString());
        }
    }
}