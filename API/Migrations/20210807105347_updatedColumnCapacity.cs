using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class updatedColumnCapacity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "goodForNumberOfPersons",
                table: "Rooms",
                newName: "capacity");

            migrationBuilder.RenameColumn(
                name: "allowExtraPax",
                table: "Rooms",
                newName: "isAllowExtraPax");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isAllowExtraPax",
                table: "Rooms",
                newName: "allowExtraPax");

            migrationBuilder.RenameColumn(
                name: "capacity",
                table: "Rooms",
                newName: "goodForNumberOfPersons");
        }
    }
}
