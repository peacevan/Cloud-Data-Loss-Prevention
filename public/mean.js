'use strict';
// node v8.11.3
///const Buffer = require('buffer').Buffer;
//const path = require('path');
//const fs = require('fs');
/**
 * @param  {string} filename
 */
function encode_base64(filename) {
    fs.readFile(path.join(__dirname, '/public/', filename), function (error, data) {
        if (error) {
            throw error;
        } else {
            let buf = Buffer.from(data);
            let base64 = buf.toString('base64');
            // console.log('Base64 ' + filename + ': ' + base64);
            return base64;
        }
    });
}
/**
 * @param  {string} base64str
 * @param  {string} filename
 */
function decode_base64(base64str, filename) {
    let buf = Buffer.from(base64str, 'base64');
    fs.writeFile(path.join(__dirname, '/public/', filename), buf, function (error) {
        if (error) {
            throw error;
        } else {
            console.log('File created from base64 string!');
            return true;
        }
    });
}




  function loadClient() {
    //var imagens = $('input[type="file"]');
    var imagens = document.getElementById('fileImagem').files;
     var imagens2=imagens;
    //for (var i = 0, f; f = imagens[i]; i++) {

    // for (var i = 0; i < imagens.length; i++) {
    //}
	
	;
    $.each(imagens,  async function (i,file) {
      console.log(i)
        let list = new DataTransfer();
        list.items.add(file);
        let myFileList = list.files[i];  
		imagens.files=myFileList;
	    gapi.client.setApiKey("AIzaSyCcUCyGaQNzTo4m_SQbVJFTaaZZTlZ5_wM");
        $('#img-spinner').css("display", "block");
		return  gapi.client.load("https://content.googleapis.com/discovery/v1/apis/dlp/v2/rest")
                 
                .then( async function () {
                   console.log(i);

				   
                let result=await execute(imagens[i],true);
				let dNow = new Date();
				// console.log(dNow);
				 $('#spinner').css("display", "none");
                },
                        function (err) {
                            console.error("Error loading GAPI client for API", err);
                            alert("Error loading GAPI client for API", err.message);
                        });
			
			
		
		
    	 
        //}
		
    })
	

}

// Make sure the client is loaded before calling this method.
  function execute(file,i) {


   
    //converte o arquivo para base 64
      base64(file, function (data) {
        var imagem = 'data:image/jpeg;base64,' + data.base64;
        $("#imagem").attr('src', imagem);
		dataLossPrevention(data.base64);
	},true);
}

function base64(file,callback,flag=false) {
    var coolFile = {};
    function readerOnload(e) {
        var base64 = btoa(e.target.result);
        coolFile.base64 = base64;
        callback(coolFile);
    };
    var reader = new FileReader();
    reader.onload = readerOnload;
       if (flag==false){
	    var file = file[0].files[0];	
		
	} else{
		//console.log('aqui');
		//console.log(file);
		//file = file[0];
		
	}
	coolFile.filetype = file.type;
    coolFile.size = file.size;
    coolFile.filename = file.name;
    reader.readAsBinaryString(file);

};

function dataLossPrevetion(base64file){
	
	        var dicionario = $('#text-dicionario').val(); //'Testando palavras';
    let linhas = dicionario.split('\n');
    linhas = linhas.filter(linha => linha.trim());
    dicionario = linhas;
    var excludeWord = $('#exclude-Word').val(); //'Testando palavras';
    let linhasExclude = excludeWord.split('\n');
    linhasExclude = linhasExclude.filter(linha => linha.trim());
    excludeWord = linhasExclude;
	
        var dados = {
            "byteItem": {
                "data": base64file,
                "type": "IMAGE_JPEG"
            },
            "imageRedactionConfigs": [
                {
                    "infoType": {
                        "name": "PHONE_NUMBER"
                    },
                    "redactionColor": {
                        "blue": 0.98,
                        "green": 1.0,
                        "red": 0.96
                    }
                },
                {
                    "infoType": {
                        "name": "PERSON_NAME"
                    },
                    "redactionColor": {
                        "blue": 0.98,
                        "green": 1.0,
                        "red": 0.96
                    }
                },
                {
                    "infoType": {
                        "name": "MALE_NAME"
                    },
                    "redactionColor": {
                        "blue": 0.98,
                        "green": 1.0,
                        "red": 0.96
                    }
                },
                {
                    "infoType": {
                        "name": "FEMALE_NAME"
                    },
                    "redactionColor": {
                        "blue": 0.98,
                        "green": 1.0,
                        "red": 0.96
                    }
                },
                {
                    "infoType": {
                        "name": "FIRST_NAME"
                    },
                    "redactionColor": {
                        "blue": 0.98,
                        "green": 1.0,
                        "red": 0.96
                    }
                },
                {
                    "infoType": {
                        "name": "GENDER"
                    },
                    "redactionColor": {
                        "blue": 0.98,
                        "green": 1.0,
                        "red": 0.96
                    }
                },
                {
                    "infoType": {
                        "name": "LAST_NAME"
                    },
                    "redactionColor": {
                        "blue": 0.98,
                        "green": 1.0,
                        "red": 0.96
                    }
                },
                {
                    "infoType": {
                        "name": "DATE_OF_BIRTH"
                    },
                    "redactionColor": {
                        "blue": 0.98,
                        "green": 1.0,
                        "red": 0.96
                    }
                },
                {
                    "infoType": {
                        "name": "AGE"
                    },
                    "redactionColor": {
                        "blue": 0.98,
                        "green": 1.0,
                        "red": 0.96
                    }
                },
                {
                    "infoType": {
                        "name": "BRAZIL_CPF_NUMBER"
                    },
                    "redactionColor": {
                        "blue": 0.98,
                        "green": 1.0,
                        "red": 0.96
                    }
                },
                {
                    "infoType": {
                        "name": "DOC_RG"
                    },
                    "redactionColor": {
                        "blue": 0.98,
                        "green": 1.0,
                        "red": 0.96
                    }
                },
                {
                    "infoType": {
                        "name": "DOC_RG2"
                    },
                    "redactionColor": {
                        "blue": 0.98,
                        "green": 1.0,
                        "red": 0.96
                    }
                },
                {
                    "infoType": {
                        "name": "DICTIONARY_WORD"
                    },
                    "redactionColor": {
                        "blue": 0.98,
                        "green": 1.0,
                        "red": 0.96
                    }
                },
                {
                    "infoType": {
                        "name": "TEL_BR"
                    },
                    "redactionColor": {
                        "blue": 0.98,
                        "green": 1.0,
                        "red": 0.96
                    }
                }
            ],
            "inspectConfig": {
                "ruleSet": [
                    {
                        "infoTypes": [
                            {
                                "name": "ALL_BASIC"
                            }
                        ],
                        "rules": [
                            {
                                "exclusionRule": {
                                    "dictionary": {
                                        "wordList": {
                                            "words": excludeWord
                                        }
                                    },
                                    "matchingType": "MATCHING_TYPE_PARTIAL_MATCH"
                                }
                            }
                        ]
                    }
                ],
                "excludeInfoTypes": false,
                "infoTypes": [
                    {"name": "AGE"},
                    {"name": "DATE_OF_BIRTH"},
                    {"name": "GENDER"},
                    {"name": "LAST_NAME"},
                    {"name": "FIRST_NAME"},
                    {"name": "PERSON_NAME"},
                    {"name": "FEMALE_NAME"},
                    {"name": "MALE_NAME"},
                    {"name": "BRAZIL_CPF_NUMBER"},
                    {"name": "PHONE_NUMBER"},
                    {"name": "PERSON_NAME"}

                ],
                /*infoType costumizado de dicionário   
                 * receber uma lista de palavras e chaves que será protegidas
                 * */
                "customInfoTypes": [
                    {
                        "infoType": {
                            "name": "DICTIONARY_WORD"
                        },
                        "likelihood": "POSSIBLE",
                        /* "detectionRules": [
                         {
                         "hotwordRule": {
                         //[HOTWORDRULE_OBJECT]
                         'Testando palavras'
                         }
                         },
                         ],*/
                        "dictionary": {
                            "wordList": {
                                "words": dicionario
                                        //   [
                                        // "[DICTIONARY_WORD1]",
                                        // "[DICTIONARY_WORD2]",
                                        // "[ETC.]"
                                        //]
                            }
                        }
                    },
                    //expressão regular formato 444-5-22222"

                    {
                        "infoType": {
                            "name": "DOC_RG_"
                        },
                        "regex": {
                            "pattern": "[1-9]{3}-[1-9]{1}-[1-9]{5}"
                        },
                        "likelihood": "POSSIBLE",
                    },
                    {
                        "infoType": {
                            "name": "DOC_RG"
                        },
                        "regex": {
                            "pattern": "[0-9]{2}.[0-9]{3}.[0-9]{3}-[0-9]{2}"
                        },
                        "likelihood": "POSSIBLE",
                    }
                    , {
                        "infoType": {
                            "name": "DOC_RG2"
                        },
                        "regex": {
                            "pattern": "[0-9]{8}-[0-9]{2}"
                        },
                        "likelihood": "POSSIBLE",
                    }
                    , {
                        "infoType": {
                            "name": "TEL_BR"
                        },
                        "regex": {
                            "pattern": "^\([1-9]{2}\) [9]{0,1}[6-9]{1}[0-9]{3}\-[0-9]{4}$"
                        },
                        "likelihood": "POSSIBLE",
                    }



                ],

                "minLikelihood": "POSSIBLE",
            },
        
		}


        return gapi.client.dlp.projects.image.redact({
            "parent": "projects/maya-teste",
            "alt": "json",
            "prettyPrint": true,
            "resource": dados

        }).then(function (response) {
            // Handle the results here (response.result has the parsed body).
            var imagem = 'data:image/jpeg;base64,' + response.result.redactedImage;
            $("#imagemResult").attr('src', imagem);
            var img = document.createElement('img');
            $(img).attr('src', imagem);
            //$('#imagemResult').append('<br>'+img);
			//$('#lista-imagem').appendChild(img);
			document.getElementById("lista-imagem").appendChild(img); 
			
			
			console.log(img);
			
            //$('#spinner').css("display", "none");
        },
                function (err) {
                    console.error("Execute error", err);
                    $('#spinner').css("display", "none");
                });
    
	
	return data.base64;
}

$('input[type="file"]').on("change", function () {
    //converte o arquivo para base 64



});


function loadPalavrasProtection() {
    $.ajax({
        url: "ListWordInclude.txt",
        dataType: "text",
        success: function (data) {
            //$(".text").html(data);
            console.log(data);
            $('#text-dicionario').val(data);
        }
    });

    $.ajax({
        url: "ListWordExclude.txt",
        dataType: "text",
        success: function (data) {
            //$(".text").html(data);
            console.log(data);
            $('#exclude-Word').val(data);
        }
    });



}
gapi.load("client");
function result(data) {
    return data;
}
//encode_base64('ddr.jpg');
//decode_base64('any_base64_string_goes_here', 'rane.jpg');


/**
 *
 *  UTF-8 data encode / decode
 *  http://www.webtoolkit.info/
 *
 **/

var Utf8 = {

    // public method for url encoding
    encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // public method for url decoding
    decode: function (utftext) {
        var string = "";
        var i = 0;
        var c2 = 0;
        var c1 = c2;
        var c = c1;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                var c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

}

