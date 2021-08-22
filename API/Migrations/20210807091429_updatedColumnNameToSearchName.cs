using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class updatedColumnNameToSearchName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "roomShortName",
                table: "Rooms",
                newName: "searchName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "searchName",
                table: "Rooms",
                newName: "roomShortName");
        }
    }
}
