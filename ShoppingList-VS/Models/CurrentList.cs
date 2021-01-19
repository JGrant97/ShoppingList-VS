using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShoppingList_VS.Models
{
    public class CurrentList
    {
        public int Id { get; set; }
        public List<ListItem> Items { get; set; }
    }
}