using System;
using System.Linq;
using ProyectoFormativo.Data;
using ProyectoFormativo.Modelos;
using QuestPDF.Fluent;
using QuestPDF.Helpers;

namespace PDFGenerator
{
    public class PDFGenerator : IPDFGenerator
    {
        public readonly ProyectoPruebaContext _proyectoFormativoContext;

        public PDFGenerator (ProyectoPruebaContext proyectoFormativoContext)
        {
            _proyectoFormativoContext = proyectoFormativoContext;
        }

        public byte[] GeneratePDF()
        {
            
            var imagePath = "wwwroot/images/logo.png";
            var data = Document.Create(document =>
            {
                document.Page(page =>
                {

                    page.Margin(30);

                    page.Header().ShowOnce().Row(row =>
                    {

                        row.ConstantItem(70).Image(imagePath);

                        row.RelativeColumn();

                        row.RelativeItem().Column(col =>
                        {
                            col.Item().Border(1).BorderColor(Colors.Green.Medium).Background(Colors.Green.Medium).AlignCenter().Text("Servicio Nacional de Aprendizaje").Bold().FontSize(12).FontColor(Colors.White);
                            col.Item().Border(1).BorderColor(Colors.Green.Medium).AlignCenter().Text("Centro de Comercios y Servicios").FontSize(9);
                            col.Item().Border(1).BorderColor(Colors.Green.Medium).Background(Colors.Green.Medium).AlignCenter().Text("Ibagué - Tolima").FontSize(9).FontColor(Colors.White);
                            col.Item().Border(1).BorderColor(Colors.Green.Medium).AlignCenter().Text("Tel. 111015496").FontSize(9);


                        });

                    });

                    page.Content().PaddingVertical(10).Column(col1 =>
                    {
                        col1.Item().Column(col2 =>
                        {
                            col2.Item().Text("Reporte Tecnólogos - Presencial").Bold();

                            col2.Item().Text(txt =>
                            {
                                txt.Span("Coordinadora Académica: ").SemiBold().FontSize(10);
                                txt.Span("Yolanda Cardenas Villamarín").FontSize(10);
                            });

                            col2.Item().Text(txt =>
                            {
                                txt.Span("Centro: ").SemiBold().FontSize(10);
                                txt.Span("Comercios y Servicios").FontSize(10);
                            });

                            col2.Item().Text(txt =>
                            {
                                txt.Span("Ciudad: ").SemiBold().FontSize(10);
                                txt.Span("Ibagué").FontSize(10);
                            });
                        });

                        col1.Item().LineHorizontal(0.5f);

                        col1.Item().Table(table =>
                        {
                            table.ColumnsDefinition(columns =>
                            {
                                columns.RelativeColumn(2);
                                columns.RelativeColumn();
                                columns.RelativeColumn();
                                columns.RelativeColumn();
                            });

                            table.Header(header =>
                            {
                                header.Cell().Background(Colors.Green.Medium).Padding(2).Text("Red de conocimiento").FontColor(Colors.White);
                                header.Cell().Background(Colors.Green.Medium).Padding(2).Text("Meta").FontColor(Colors.White);
                                header.Cell().Background(Colors.Green.Medium).Padding(2).Text("Número de instructores").FontColor(Colors.White);
                                header.Cell().Background(Colors.Green.Medium).Padding(2).Text("Presupuesto").FontColor(Colors.White);
                            });

                            var networks = _proyectoFormativoContext.Networks;

                            foreach (var item in networks.ToList())
                            {

                                var red = item;
                                var meta = new Random().Next(1, 5000);
                                var numeroInstructores = meta / 30;
                                var presupuesto = numeroInstructores * 4000000;

                                table.Cell().BorderBottom(0.5f).BorderColor(Colors.LightGreen.Medium).Padding(2).Text(red.NetworkName).FontSize(10);
                                table.Cell().BorderBottom(0.5f).BorderColor(Colors.LightGreen.Medium).Padding(2).Text(meta.ToString()).FontSize(10);
                                table.Cell().BorderBottom(0.5f).BorderColor(Colors.LightGreen.Medium).Padding(2).Text(numeroInstructores.ToString()).FontSize(10);
                                table.Cell().BorderBottom(0.5f).BorderColor(Colors.LightGreen.Medium).Padding(2).Text($"$ {presupuesto}").FontSize(10);
                            }
                        });

                        col1.Item().AlignRight().Text("Total: $ 10000").FontSize(12);

                        col1.Item().Background(Colors.Grey.Lighten3).Padding(10).Column(column =>
                        {
                            column.Item().Text("Comentarios").FontSize(14);
                            column.Item().Text(Placeholders.LoremIpsum());
                            column.Spacing(5);
                        });

                        col1.Item().Column(col2 =>
                        {
                            col2.Item().Text("Reporte Tecnólogos - Virtual").Bold();

                            col2.Item().Text(txt =>
                            {
                                txt.Span("Coordinadora Académica: ").SemiBold().FontSize(10);
                                txt.Span("Yolanda Cardenas Villamarín").FontSize(10);
                            });

                            col2.Item().Text(txt =>
                            {
                                txt.Span("Centro: ").SemiBold().FontSize(10);
                                txt.Span("Comercios y Servicios").FontSize(10);
                            });

                            col2.Item().Text(txt =>
                            {
                                txt.Span("Ciudad: ").SemiBold().FontSize(10);
                                txt.Span("Ibagué").FontSize(10);
                            });
                        });

                        col1.Item().LineHorizontal(0.5f);

                        col1.Item().Table(table =>
                        {
                            table.ColumnsDefinition(columns =>
                            {
                                columns.RelativeColumn(2);
                                columns.RelativeColumn();
                                columns.RelativeColumn();
                                columns.RelativeColumn();
                            });

                            table.Header(header =>
                            {
                                header.Cell().Background(Colors.Green.Medium).Padding(2).Text("Red de conocimiento").FontColor(Colors.White);
                                header.Cell().Background(Colors.Green.Medium).Padding(2).Text("Meta").FontColor(Colors.White);
                                header.Cell().Background(Colors.Green.Medium).Padding(2).Text("Número de instructores").FontColor(Colors.White);
                                header.Cell().Background(Colors.Green.Medium).Padding(2).Text("Presupuesto").FontColor(Colors.White);
                            });

                            foreach (var item in Enumerable.Range(1, 12))
                            {
                                var red = Placeholders.Random.Next(1, 10);
                                var meta = new Random().Next(1, 5000);
                                var numeroInstructores = meta / 30;
                                var presupuesto = numeroInstructores * 4000000;

                                table.Cell().BorderBottom(0.5f).BorderColor(Colors.LightGreen.Medium).Padding(2).Text(Placeholders.Label()).FontSize(10);
                                table.Cell().BorderBottom(0.5f).BorderColor(Colors.LightGreen.Medium).Padding(2).Text(meta.ToString()).FontSize(10);
                                table.Cell().BorderBottom(0.5f).BorderColor(Colors.LightGreen.Medium).Padding(2).Text(numeroInstructores.ToString()).FontSize(10);
                                table.Cell().BorderBottom(0.5f).BorderColor(Colors.LightGreen.Medium).Padding(2).Text($"$ {presupuesto}").FontSize(10);
                            }
                        });

                        col1.Item().AlignRight().Text("Total: $ 10000").FontSize(12);

                        col1.Item().Background(Colors.Grey.Lighten3).Padding(10).Column(column =>
                        {
                            column.Item().Text("Comentarios").FontSize(14);
                            column.Item().Text(Placeholders.LoremIpsum());
                            column.Spacing(5);
                        });

                        col1.Item().Column(col2 =>
                        {
                            col2.Item().Text("Reporte Técnico - Presencial").Bold();

                            col2.Item().Text(txt =>
                            {
                                txt.Span("Coordinadora Académica: ").SemiBold().FontSize(10);
                                txt.Span("Yolanda Cardenas Villamarín").FontSize(10);
                            });

                            col2.Item().Text(txt =>
                            {
                                txt.Span("Centro: ").SemiBold().FontSize(10);
                                txt.Span("Comercios y Servicios").FontSize(10);
                            });

                            col2.Item().Text(txt =>
                            {
                                txt.Span("Ciudad: ").SemiBold().FontSize(10);
                                txt.Span("Ibagué").FontSize(10);
                            });
                        });

                        col1.Item().LineHorizontal(0.5f);

                        col1.Item().Table(table =>
                        {
                            table.ColumnsDefinition(columns =>
                            {
                                columns.RelativeColumn(2);
                                columns.RelativeColumn();
                                columns.RelativeColumn();
                                columns.RelativeColumn();
                            });

                            table.Header(header =>
                            {
                                header.Cell().Background(Colors.Green.Medium).Padding(2).Text("Red de conocimiento").FontColor(Colors.White);
                                header.Cell().Background(Colors.Green.Medium).Padding(2).Text("Meta").FontColor(Colors.White);
                                header.Cell().Background(Colors.Green.Medium).Padding(2).Text("Número de instructores").FontColor(Colors.White);
                                header.Cell().Background(Colors.Green.Medium).Padding(2).Text("Presupuesto").FontColor(Colors.White);
                            });

                            foreach (var item in Enumerable.Range(1, 12))
                            {
                                var red = Placeholders.Random.Next(1, 10);
                                var meta = new Random().Next(1, 5000);
                                var numeroInstructores = meta / 30;
                                var presupuesto = numeroInstructores * 4000000;

                                table.Cell().BorderBottom(0.5f).BorderColor(Colors.LightGreen.Medium).Padding(2).Text(Placeholders.Label()).FontSize(10);
                                table.Cell().BorderBottom(0.5f).BorderColor(Colors.LightGreen.Medium).Padding(2).Text(meta.ToString()).FontSize(10);
                                table.Cell().BorderBottom(0.5f).BorderColor(Colors.LightGreen.Medium).Padding(2).Text(numeroInstructores.ToString()).FontSize(10);
                                table.Cell().BorderBottom(0.5f).BorderColor(Colors.LightGreen.Medium).Padding(2).Text($"$ {presupuesto}").FontSize(10);
                            }
                        });

                        col1.Item().AlignRight().Text("Total: $ 10000").FontSize(12);

                        col1.Item().Background(Colors.Grey.Lighten3).Padding(10).Column(column =>
                        {
                            column.Item().Text("Comentarios").FontSize(14);
                            column.Item().Text(Placeholders.LoremIpsum());
                            column.Spacing(5);
                        });

                        col1.Item().Column(col2 =>
                        {
                            col2.Item().Text("Reporte Técnico - Virtual").Bold();

                            col2.Item().Text(txt =>
                            {
                                txt.Span("Coordinadora Académica: ").SemiBold().FontSize(10);
                                txt.Span("Yolanda Cardenas Villamarín").FontSize(10);
                            });

                            col2.Item().Text(txt =>
                            {
                                txt.Span("Centro: ").SemiBold().FontSize(10);
                                txt.Span("Comercios y Servicios").FontSize(10);
                            });

                            col2.Item().Text(txt =>
                            {
                                txt.Span("Ciudad: ").SemiBold().FontSize(10);
                                txt.Span("Ibagué").FontSize(10);
                            });
                        });

                        col1.Item().LineHorizontal(0.5f);

                        col1.Item().Table(table =>
                        {
                            table.ColumnsDefinition(columns =>
                            {
                                columns.RelativeColumn(2);
                                columns.RelativeColumn();
                                columns.RelativeColumn();
                                columns.RelativeColumn();
                            });

                            table.Header(header =>
                            {
                                header.Cell().Background(Colors.Green.Medium).Padding(2).Text("Red de conocimiento").FontColor(Colors.White);
                                header.Cell().Background(Colors.Green.Medium).Padding(2).Text("Meta").FontColor(Colors.White);
                                header.Cell().Background(Colors.Green.Medium).Padding(2).Text("Número de instructores").FontColor(Colors.White);
                                header.Cell().Background(Colors.Green.Medium).Padding(2).Text("Presupuesto").FontColor(Colors.White);
                            });

                            foreach (var item in Enumerable.Range(1, 12))
                            {
                                var red = Placeholders.Random.Next(1, 10);
                                var meta = new Random().Next(1, 5000);
                                var numeroInstructores = meta / 30;
                                var presupuesto = numeroInstructores * 4000000;

                                table.Cell().BorderBottom(0.5f).BorderColor(Colors.LightGreen.Medium).Padding(2).Text(Placeholders.Label()).FontSize(10);
                                table.Cell().BorderBottom(0.5f).BorderColor(Colors.LightGreen.Medium).Padding(2).Text(meta.ToString()).FontSize(10);
                                table.Cell().BorderBottom(0.5f).BorderColor(Colors.LightGreen.Medium).Padding(2).Text(numeroInstructores.ToString()).FontSize(10);
                                table.Cell().BorderBottom(0.5f).BorderColor(Colors.LightGreen.Medium).Padding(2).Text($"$ {presupuesto}").FontSize(10);
                            }
                        });

                        col1.Item().AlignRight().Text("Total: $ 10000").FontSize(12);

                        col1.Item().Background(Colors.Grey.Lighten3).Padding(10).Column(column =>
                        {
                            column.Item().Text("Comentarios").FontSize(14);
                            column.Item().Text(Placeholders.LoremIpsum());
                            column.Spacing(5);
                        });

                        col1.Spacing(10);
                    });


                    page.Footer().AlignRight().Text(txt =>
                    {
                        txt.Span("Página ").FontSize(10);
                        txt.CurrentPageNumber().FontSize(10);
                        txt.Span(" de ").FontSize(10);
                        txt.TotalPages().FontSize(10);
                    });

                });
            }).GeneratePdf();

            return data;
        }
    }
}
