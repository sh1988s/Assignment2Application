<%@ Page Title="PastPowerOutages" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="PastPowerOutages.aspx.cs" Inherits="PowerInterruptions.PastPowerOutages" %>

<asp:Content ID="Content1" ContentPlaceHolderID="CPHead" runat="server">

    <!-- Styles to make your graphs work go here -->

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="CPBody" runat="server">


<!-- Your HTML and JavaScript goes here -->
    <div id="tableData"></div>
    <div id="graphData">
        <div class="graph">
            <div style="height:70%;background-color:red;"></div>
            <div style="height:80%;background-color:yellow;"></div>
        </div>

    </div>

</asp:Content>
