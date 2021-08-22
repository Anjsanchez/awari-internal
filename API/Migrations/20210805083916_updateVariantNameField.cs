using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class updateVariantNameField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "roomVariant",
                table: "RoomVariants",
                newName: "variantName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "variantName",
                table: "RoomVariants",
                newName: "roomVariant");
        }
    }
}
