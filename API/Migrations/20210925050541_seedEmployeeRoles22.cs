using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class seedEmployeeRoles22 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
           table: "EmployeeRoles",
           columns: new[] { "_id", "userId", "roleKey" },
           values: new object[,]
           {
            { Guid.NewGuid(), new Guid("29b57807-0bae-4149-9a6e-c7e369fa4dfe"),"1" },
            { Guid.NewGuid(), new Guid("29b57807-0bae-4149-9a6e-c7e369fa4dfe"),"2" },
            { Guid.NewGuid(), new Guid("29b57807-0bae-4149-9a6e-c7e369fa4dfe"),"3" },
            { Guid.NewGuid(), new Guid("29b57807-0bae-4149-9a6e-c7e369fa4dfe"),"4" },
            { Guid.NewGuid(), new Guid("29b57807-0bae-4149-9a6e-c7e369fa4dfe"),"5" },
            { Guid.NewGuid(), new Guid("29b57807-0bae-4149-9a6e-c7e369fa4dfe"),"6" },
            { Guid.NewGuid(), new Guid("29b57807-0bae-4149-9a6e-c7e369fa4dfe"),"7" },
            { Guid.NewGuid(), new Guid("29b57807-0bae-4149-9a6e-c7e369fa4dfe"),"8" },
            { Guid.NewGuid(), new Guid("29b57807-0bae-4149-9a6e-c7e369fa4dfe"),"9" },
            { Guid.NewGuid(), new Guid("29b57807-0bae-4149-9a6e-c7e369fa4dfe"),"10" },
            { Guid.NewGuid(), new Guid("29b57807-0bae-4149-9a6e-c7e369fa4dfe"),"11" },
            { Guid.NewGuid(), new Guid("29b57807-0bae-4149-9a6e-c7e369fa4dfe"),"12" },
            { Guid.NewGuid(), new Guid("29b57807-0bae-4149-9a6e-c7e369fa4dfe"),"13" },
            { Guid.NewGuid(), new Guid("29b57807-0bae-4149-9a6e-c7e369fa4dfe"),"14" },
            { Guid.NewGuid(), new Guid("29b57807-0bae-4149-9a6e-c7e369fa4dfe"),"15" },
            { Guid.NewGuid(), new Guid("29b57807-0bae-4149-9a6e-c7e369fa4dfe"),"16" },
            { Guid.NewGuid(), new Guid("29b57807-0bae-4149-9a6e-c7e369fa4dfe"),"17" },
            { Guid.NewGuid(), new Guid("29b57807-0bae-4149-9a6e-c7e369fa4dfe"),"18" },
            { Guid.NewGuid(), new Guid("29b57807-0bae-4149-9a6e-c7e369fa4dfe"),"19" },
            { Guid.NewGuid(), new Guid("29b57807-0bae-4149-9a6e-c7e369fa4dfe"),"20" },
            { Guid.NewGuid(), new Guid("29b57807-0bae-4149-9a6e-c7e369fa4dfe"),"21" },


            { Guid.NewGuid(), new Guid("EE9BF2B0-BA77-438F-BC7D-DCE0DB8A13C0"),"1" },
            { Guid.NewGuid(), new Guid("EE9BF2B0-BA77-438F-BC7D-DCE0DB8A13C0"),"2" },
            { Guid.NewGuid(), new Guid("EE9BF2B0-BA77-438F-BC7D-DCE0DB8A13C0"),"3" },
            { Guid.NewGuid(), new Guid("EE9BF2B0-BA77-438F-BC7D-DCE0DB8A13C0"),"4" },
            { Guid.NewGuid(), new Guid("EE9BF2B0-BA77-438F-BC7D-DCE0DB8A13C0"),"5" },
            { Guid.NewGuid(), new Guid("EE9BF2B0-BA77-438F-BC7D-DCE0DB8A13C0"),"6" },
            { Guid.NewGuid(), new Guid("EE9BF2B0-BA77-438F-BC7D-DCE0DB8A13C0"),"7" },
            { Guid.NewGuid(), new Guid("EE9BF2B0-BA77-438F-BC7D-DCE0DB8A13C0"),"8" },
            { Guid.NewGuid(), new Guid("EE9BF2B0-BA77-438F-BC7D-DCE0DB8A13C0"),"9" },
            { Guid.NewGuid(), new Guid("EE9BF2B0-BA77-438F-BC7D-DCE0DB8A13C0"),"10" },
            { Guid.NewGuid(), new Guid("EE9BF2B0-BA77-438F-BC7D-DCE0DB8A13C0"),"11" },
            { Guid.NewGuid(), new Guid("EE9BF2B0-BA77-438F-BC7D-DCE0DB8A13C0"),"12" },
            { Guid.NewGuid(), new Guid("EE9BF2B0-BA77-438F-BC7D-DCE0DB8A13C0"),"13" },
            { Guid.NewGuid(), new Guid("EE9BF2B0-BA77-438F-BC7D-DCE0DB8A13C0"),"14" },
            { Guid.NewGuid(), new Guid("EE9BF2B0-BA77-438F-BC7D-DCE0DB8A13C0"),"15" },
            { Guid.NewGuid(), new Guid("EE9BF2B0-BA77-438F-BC7D-DCE0DB8A13C0"),"16" },
            { Guid.NewGuid(), new Guid("EE9BF2B0-BA77-438F-BC7D-DCE0DB8A13C0"),"17" },
            { Guid.NewGuid(), new Guid("EE9BF2B0-BA77-438F-BC7D-DCE0DB8A13C0"),"18" },
            { Guid.NewGuid(), new Guid("EE9BF2B0-BA77-438F-BC7D-DCE0DB8A13C0"),"19" },
            { Guid.NewGuid(), new Guid("EE9BF2B0-BA77-438F-BC7D-DCE0DB8A13C0"),"20" },
            { Guid.NewGuid(), new Guid("EE9BF2B0-BA77-438F-BC7D-DCE0DB8A13C0"),"21" },
           });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
