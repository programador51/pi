import styled from 'styled-components';

const ContainerTable = styled.div`
    background:url('https://res.cloudinary.com/dmtvwe2ur/image/upload/v1621226311/bg-ste_odr5gk.png') no-repeat left;
    background-size: 25%;
    height: 100vh;
    width: 90%;
    margin:0 0 0 10%;

    display: grid;
    grid-template-columns: repeat(4,24%);
    grid-template-rows: 10vh 80vh 10vh;
    grid-template-areas: 
    
    "header . . filter"
    ". table table ."
    ". . . buttons"
    
    ;

    header,.filter{
        padding:10px;
        display: flex;
        justify-content: center;
        align-items: center;
        
    }

    .edit{
        grid-area:buttons;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    header{
        grid-area: header;
    }

    .filter{
        grid-area:filter;
    }

    .customTable{
        grid-area: table;
        display: grid;
        grid-template-columns: 1fr;
        overflow: auto;
        grid-template-rows: 90% 10%;
        grid-template-areas: 
        "table"
        "pagination"
        ;
        box-shadow: 0px 0.33em 0.33em rgba(0, 0, 0, 0.25);
        background-color: #fff;
        border-radius: 1.06em;
        padding: 3em 0em;
        background-color: white;
        overflow: auto;
        padding: 30px;

        .containerTable{
            grid-area: table;
            
            overflow: auto;
        }

        .pagination-tickets{
            grid-area: pagination;
        }
    }

`;

export default ContainerTable;