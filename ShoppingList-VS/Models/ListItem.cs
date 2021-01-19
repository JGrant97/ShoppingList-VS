using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShoppingList_VS.Models
{
    public class ListItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Index { get; set; }
        public bool HighPriority { get; set; }

    }
}