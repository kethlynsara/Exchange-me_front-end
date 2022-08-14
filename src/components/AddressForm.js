import axios from 'axios';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import { FaRegCheckCircle } from 'react-icons/fa';
import { HiOutlineChevronDoubleRight } from "react-icons/hi";

import UserContext from '../contexts/UserContext';

function AddressForm({inputs, setInputs}) {
    const { setConfirmOrderStep } = useContext(UserContext);
    const [frete, setFrete] = useState(false);

    function clearForm() {
        setInputs({...inputs,
            rua: '',
            bairro: '',
            cidade: '',
            uf: ''
        });
    }

    async function checkCPF() {
        const cep = inputs.cep.replace(/\D/g, '');
        if (cep !== "") {
            const validateCEP = /^[0-9]{8}$/;
            if (validateCEP.test(cep)) {
                try {
                    const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                    setInputs({...inputs,
                        rua: data.logradouro,
                        bairro: data.bairro,
                        cidade: data.localidade,
                        uf: data.uf
                    });
                    if (data.erro) {
                        alert("CPF inválido!");
                    }
                    console.log(data)
                }catch(e) {
                    alert(e.response.data);
                }
            } else {
                clearForm();
                alert("Formato de CEP inválido.");
            }
        } else {
            clearForm();
            alert("Formato de CEP inválido.");
        }
    }

    return (
        <Box>
            <Container>
                <H1>Confirme os dados de entrega</H1>
                <form>
                    <Input type='text' placeholder='Nome' value={inputs.nome} required
                           onChange={(e) => setInputs({...inputs, nome: e.target.value})}></Input>

                    <Input type='email' placeholder='E-mail' value={inputs.email} required
                           onChange={(e) => setInputs({...inputs, email: e.target.value})}></Input>

                    <Input type='tel' placeholder='Telefone' value={inputs.telefone} required
                           onChange={(e) => setInputs({...inputs, telefone: e.target.value})}></Input>
                    <div className='inputs-size'>
                        <Input type='text' placeholder='CEP' value={inputs.cep} required className='cep'
                             onBlur={checkCPF}
                             onChange={(e) => setInputs({...inputs, cep: e.target.value})}></Input>

                        <Input type='text' placeholder='Nº' value={inputs.num} required className='num'
                             onChange={(e) => setInputs({...inputs, num: e.target.value})}></Input>
                    </div>

                    <Input type='text' placeholder='Rua' value={inputs.rua} required
                            onChange={(e) => setInputs({...inputs, rua: e.target.value})}></Input>
                
                    <Input type='text' placeholder='Bairro' value={inputs.bairro} required
                            onChange={(e) => setInputs({...inputs, bairro: e.target.value})}></Input>
                   
                    <div className='inputs-size'>
                        <Input type='text' placeholder='Cidade' value={inputs.cidade} required className='cidade'
                            onChange={(e) => setInputs({...inputs, cidade: e.target.value})}></Input>

                        <Input type='text' placeholder='UF' value={inputs.uf} required className='uf'
                            onChange={(e) => setInputs({...inputs, uf: e.target.value})}></Input>
                    </div>

                    <Frete color={frete ? "green" : "#FFFFFF"}  onClick={() => setFrete(!frete)}>
                        <FaRegCheckCircle />
                        <p>Frete grátis</p>
                    </Frete>
                    
                    <NextIcon onClick={() => setConfirmOrderStep(2)}>
                        <HiOutlineChevronDoubleRight />
                    </NextIcon>
                    {/* <Button type='button' onClick={() => setConfirmOrderStep(2)}>Finalizar Pedido</Button> */}
               </form>
            </Container>
        </Box>

   )
}

export default AddressForm;

const H1 = styled.h1`
    font-weight: 600;
    font-size: 20px;
    color: #000000;
    margin-bottom: 48px;
`;

const Frete = styled.div`
    width: 154px;
    height: 40px;
    font-style: normal;
    color: #06070D;
    margin: 40px 0 47px 0;
    background-color: #FFFFFF;
    box-shadow: 0px 4px 32px rgba(7, 8, 14, 0.05);
    border-radius: 3px;
    border-style: solid;
    border-width: 1px;
    border-color: ${(props) => props.color};
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
        color: ${props => props.color};
    }

    p {
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        margin-left: 5px;
    }

    &:hover {
        cursor: pointer;
    }
`;

const Box = styled.div`
    .cep {
        width: 190px;
    }
    .num {
        width: 110px;
    }
    .cidade {
        width: 240px;
    }
    .uf {
        width: 57px;
    }
    .inputs-size {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
`;

const Input = styled.input`
    width: 326px;
    height: 40px;
    background: #FFFFFF;
    border: none;
    margin-bottom: 13px;
    padding-left: 15px;
`;


const Button = styled.div`
    width: 100%;
    height: 40px;
    border: none;  
    padding-top: 11px;
    font-weight: 700;
    font-size: 20px;
    text-align: center;
    color: #ffffff;
    background-color: #06070D;
    
    &:hover {
        cursor: pointer;
        background-color: #929292;
    }
    
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 50px 25px 80px 25px; 
    font-family: "Inter",Helvetica,Arial,sans-serif;
    color: #161619;
    
    
    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    input::placeholder {
        font-size: 15px;
        font-weight: 400;
        color: #06070D;
    }
`;

const NextIcon = styled.div`
    width: 60px;
    height: 30px;
    background-color: #131319;
    padding-top: 11px;
    text-align: center;
    position: absolute;
    right: 15px;
    bottom: 40px;

    svg {
        color: #FFFFFF;
        stroke-width: 10;
        width: 20px;
        height: 20px;        
    }

    &:hover {
        cursor: pointer;
        background-color: #929292;
    }
`;