using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models.Others
{
    public class SystemSetting
    {
        [Key]
        public Guid _id { get; set; }
        public string name { get; set; }
        public string value { get; set; }
    }
}