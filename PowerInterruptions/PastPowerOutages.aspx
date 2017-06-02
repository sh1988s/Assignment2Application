<%@ Page Title="PastPowerOutages" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="PastPowerOutages.aspx.cs" Inherits="PowerInterruptions.PastPowerOutages" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CPHead" runat="server">

    <!-- Styles to make your graphs work go here -->

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="CPBody" runat="server">


<!-- Your HTML and JavaScript goes here -->
    <div id="tableData"></div>
    <div id="graphData">
        <div class="div-year"><span>Year</span></div>
        <div id="graphdiv" class="graph">            
     

        </div>
        <div class="customer-text"> Customers Effected</div>
    </div>

</asp:Content>
