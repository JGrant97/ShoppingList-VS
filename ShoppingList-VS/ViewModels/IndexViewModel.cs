using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ShoppingList_VS.Models;

namespace ShoppingList_VS.ViewModels
{
    public class IndexViewModel
    {
        public PreviousList PreviousList { get; set; }
        public CurrentList CurrentList { get; set; }
    }
}