using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class renamedVariantName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "variantName",
                table: "RoomVariants",
                newName: "name");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "name",
                table: "RoomVariants",
                newName: "variantName");
        }
    }
}
