'use strict'
const MsgWhat = use('App/Models/MsgWhat')
//const urllib = require('urllib')
//const webdriver = require('selenium-webdriver')
//By = webdriver.By;
//until = webdriver.until
//const driver = await new webdriver.Builder().forBrowser('chrome').build();
//const driver = new webdriver.Builder()

const {Builder, By, Key, until} = require('selenium-webdriver');
//import { Options } from 'selenium.webdriver.firefox.options';
/*from selenium.webdriver.firefox.options import Options
import { Options } from 'selenium.webdriver.firefox.options';*/


class MsgWhatController {

    async index ({ view }) {
        const Mensagem = await MsgWhat.all()
        return view.render('index', {
            Mensagens: Mensagem.toJSON()
        })
    }

    async create ({ view }) {
        return view.render('Mensagens.create-msg-email')
    }

    async enviaWhats ({ view }) {
        const Mensagem = await MsgWhat.all()
        return view.render('EnvioWhats.envia-whats',{
            Mensagens: Mensagem.toJSON()
        })
    }

    async visualiza ({ view }) {
        const Mensagem = await MsgWhat.all()
        return view.render('Mensagens.visualiza-msg-whats', {
            Mensagens: Mensagem.toJSON(),
        })   
    }

    async store ({ request,auth,session, response }) {
        const MensagemW = await MsgWhat.create({
            user_id: auth.user.id,
            username: auth.user.username,
            titulo_msg_whats: request.input('titulo_msg_whats'),
            msg_txt_whats: request.input('msg_txt_whats')
        })
        session.flash({ 'successmessage': 'Mensagem incluída com sucesso!'})
        return response.redirect('/')
    }

    async show ({ params, view }) {
        const Mensagem = await MsgWhat.find(params.id)
        return view.render('Mensagens.view-msg-whats', {
            Mensagem: Mensagem.toJSON()
        })
    }

    async edit ({ params, view }) {
        const Mensagem = await MsgWhat.find(params.id)
        return view.render('Mensagens.edit-msg-whats', {
            Mensagem: Mensagem.toJSON()
        })
    }

    async confirm ({ params, view }) {
        const Mensagem = await MsgWhat.find(params.id)
        return view.render('Mensagens.edit-msg-whats-confirma', {
            Mensagem: Mensagem.toJSON()
        })
    }

    async update ({ params, request, response, session }) {
        const Mensagem = await MsgWhat.find(params.id)
        //Mensagem.titulo_msg_email = request.input('titulo_msg_email')
        Mensagem.msg_txt_whats = request.input('msg_txt_whats')
        await Mensagem.save()
        session.flash({'successmessage': 'Atualização registrada!'})
        return response.redirect('/')
    }

    async destroy ({ params, response, session }) {
        const Mensagem = await MsgWhat.find(params.id)
        await Mensagem.delete()
        session.flash({'successmessage': 'Mensagem deletada!'})
        return response.redirect('/')
    }

    async whatsWeb({request, response, session}) {
        //const Mensagem = await MsgEmail.all()

        let driver = await new Builder()
            .forBrowser('chrome')
            .build()
        await driver.get('https://web.whatsapp.com/');
        await driver.manage().window().maximize();

        while((await driver.findElements(By.id('side'))).length < 1) {
            await new Promise(r => setTimeout(r, 500));
        }

        const fs = require('fs');
        let rawdata = fs.readFileSync('public/baseContatos/baseContatos.json');
        let json = JSON.parse(rawdata);

        for(var i=0;i< json.length; i++){
            var telefone = json[i].telefone;
            var texto = request.input('corpo');
            texto = encodeURIComponent(texto);
            var link = "https://web.whatsapp.com/send?phone=" + telefone + "&text=" + texto + ""
            await driver.get(link);
            while((await driver.findElements(By.id('side'))).length < 1) {
                await new Promise(r => setTimeout(r, 500));
            }
            //await driver.findElement(By.xpath('//*[@id="main"]/footer/div[1]/div/div/div[2]/div[1]/div/div[2]')).sendKeys('',Key.RETURN);
            //await driver.findElement(By.xpath('//*[@id="main"]/footer/div[1]/div/span[2]/div/div[2]/div[1]/div/div[2]')).sendKeys('',Key.RETURN);
            //await driver.sendKeys('',Keys.ENTER);
            //await driver.find_element_by_css_selector('._1LbR4 > div:nth-child(2)').click()

            await driver.findElement(By.xpath('/html/body/div[1]/div[1]/div[1]/div[4]/div[1]/footer/div[1]/div/span[2]/div/div[2]/div[2]/button/span')).click();
            
            

            
            
            var min = 5000;
            var max = 8000;
            var tempo = Math.floor(Math.random() * (max - min + 1)) + min
            //console.log(tempo);
            await new Promise(r => setTimeout(r, tempo));
        }
        await driver.quit()
        session.flash({'successmessage': 'Disparo de WhatsApp finalizado!'})
        return response.redirect('/')
    };
}

module.exports = MsgWhatController



/*
    async example() {
        //options = Options()
        //options.binary_location = 'C:/Program Files/Program Files (x86)/firefox.exe';

        //let driver = await new Builder().forBrowser('firefox').build();
        //let driver = await new Builder().forBrowser('chrome').build();
        let driver = await new Builder().forBrowser('firefox').build();
        try {
          await driver.get('http://www.google.com/');
          console.log('Aqui!');
          //await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
          //await driver.wait(until.titleIs('webdriver - Google Search'), 10000);
        } finally {
          await driver.quit();
        }
      };
*/

//const webdriver = require('selenium-webdriver'),
//    By = webdriver.By;
//    until = webdriver.until
//const driver = await new webdriver.Builder().forBrowser('chrome').build();
/*
driver.get('http://www.google.com').then(function(){
driver.findElement(webdriver.By.name('q')).sendKeys('webdriver\n').then(function(){
    driver.getTitle().then(function(title) {
      console.log(title)
      if(title === 'webdriver - Google Search') {
         console.log('Test passed');
      } else {
         console.log('Test failed');
      }
     driver.quit();
    });
  });
});
*/







    //while(!document.querySelector(".my-selector")) {
    //    await new Promise(r => setTimeout(r, 500));
    //}

    //await driver.wait(webdriver.until.elementLocated(webdriver.By.id("side")), 10000);

    //const a = driver.findElement(by.id('side')).length;
    //console.log(a);

    //alert("Eu sou um alert!");

    //while (await driver.findElements(By.id('side')).length < 1){
        //delay(1);
       //alert('1 segundo');
    //}
  
    //await driver.findElement(By.name('q')).
    //driver.findElement(webdriver.By.name('q'))
    //await driver.get('http://www.google.com/ncr')
    //const element = await driver.findElement(By.name('q'))
    //await element.sendKeys('webdriver', Key.RETURN)
  
  
  
  //await driver.wait(until.titleIs('webdriver - Google Search'), 10000)
  //await driver.quit()
