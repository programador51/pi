import styled from 'styled-components';

export const ContainerTicket = styled.form`

    .listStatus{
        label , input {
            cursor:pointer;
        }

        label{
            padding:13px;
        }
    }

    background:url('https://res.cloudinary.com/dmtvwe2ur/image/upload/v1621226311/bg-ste_odr5gk.png') no-repeat left;
    background-size: 25%;
    .phoneCustomer , .customerName{
        display: flex;
        align-items: flex-start;
        justify-content: center;

        input{
            width: 80%;
        }

        select{
            height: 10px;
        }



        .icon{
            border:1px solid #000;
            border-radius: 5px;
            height: fit-content;
            padding:5px;
            margin:0 10px 0 0;
            background-color: #fff;

        }
    }

    margin:0 0 0 10%;
    padding:3vh;
    max-height: 97vh;
    display: grid;
    grid-template-columns: repeat(6,16.66%);
    grid-template-rows: 5vh 5vh 15vh 25vh 25vh 10vh 10vh;
    grid-template-areas: 
    "header header header . . ."
    "client client client ticket  ticket ticket"
    "customer customer customer customer customer customer"
    "equip equip equip equip equip equip"
    "desc desc desc desc desc desc"
    ". . pay pay . ."
    ". . quotation total . save"
    ;
    .header{
        grid-area: header;
        font-weight: bold;
    }
    .client{
        grid-area: client
    }

    .client , .ticket{
        border-bottom: 1px solid #000;
    }

    .quotation{
        grid-area: quotation;
    }

    .total{
        grid-area: total;
        width: 100%;
    }

    .save{
        grid-area: save;
        height: 60%;
    }

    .ticket{
        grid-area: ticket;
    }

    .payMethod{
        grid-area: pay;
        display: flex;
        align-items: center;
        justify-content: center;
        div{
            display: flex;
            align-items: center;
            margin:0 30px 0 0;
            input{
                margin:0 5px 0 0;
            }
        }

    }

    .amounts{
        grid-area: amounts;
    }

    .equip{
        grid-area: equip;
        overflow: auto;
        .header{
            border-bottom: 1px solid #000;
            margin: 0 20px;
        }
        div{
            margin: 8px 0 0 0;
        }

        .info{
            display: grid;
            grid-template-columns: repeat(2,45%);
            grid-template-rows: repeat(4,20%);
            grid-template-areas: 
            "leftSide deliver"
            "leftSide status"
            "leftSide status"
            "leftSide status";
            ;

            .equipment{

                input,select{
                    height: auto;
                    padding:2px;
                    min-width: 20vw;
                    max-width: 20vw;
                }

                grid-area: leftSide;
                    div{
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        label{
                        text-align: right;
                        margin:0 2px 0 0;
                        &::after{
                            content: ": ";
                        }
                        width:100%;
                    }
                }
            }

            .deliver{
                grid-area: deliver;
                display: flex;
                justify-content: space-around;
                label{
                    &::after{
                        content: ": ";
                    }
                }
                input{
                    height: auto;
                    padding: 5px;
                }
                
            }

            .status{
                grid-area: status;
                p{
                    border-bottom: 1px solid #000;
                    margin:0 15%;
                    font-weight: bold;
                }
                .listStatus{
                    display: grid;
                    grid-template-columns: repeat(2,45%);
                    grid-template-rows: repeat(2,1fr);
                    div{
                        input{
                            margin:0 10px 0 0;
                        }
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
            }
        }
    }

    .desc{
        grid-area: desc;
        display: flex;
        align-items: center;
        justify-content: center;

        textarea{
            margin: 10px;
            padding:10px;
            width: 90%;
            height: 50%;
        }
    }

    .customerInfo{
        grid-area: customer;
        display: grid;
        justify-content: space-around;
        grid-template-columns: repeat(2,45%);
        grid-template-rows: repeat(2,1fr);
        align-items: center;

        input{
            height: auto;
            padding:5px;
            margin:0 10px 0 0;
        }

        .repatirStatus , .technician{
            label{
                min-width: 40%;
            }

            input{
                width: 50%;
                
            }

            select{
                width: 50%;
            }
        }

    }

    .customerName{
        display: flex;
        align-items: flex-start;
        
    }

    .equipment{
        margin:0;
        div{
            div{
                display: block !important;
            }
            p{
                margin:0;
            }
        }
    }

    .technician , .repatirStatus{
        select{
            height: auto;
            padding:4px 0;
            /* background-color: red; */
        }

    }

    .total , .quotation{
        input{
            width: 80% ;
        }
    }

`;