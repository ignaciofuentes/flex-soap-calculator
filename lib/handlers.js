/**
 * Copyright (c) 2017 Kinvey Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */

const soap = require("soap");
const SERVICE_URL = "http://www.dneonline.com/calculator.asmx?wsdl";

function add(context, complete, modules) {
  console.log("adding");
  soap.createClient(SERVICE_URL, (err, client) => {
    if (err) {
      return complete()
        .setBody("Error")
        .ok()
        .next();
    }
    client.Calculator.CalculatorSoap.Add(
      { intA: context.body.intA, intB: context.body.intB },
      (err, result) => {
        if (err) {
          console.log("there was an error");
          console.log(err);
          return complete()
            .setBody("Error")
            .ok()
            .next();
        }
        return complete()
          .setBody(result.AddResult)
          .ok()
          .next();
      }
    );
  });
}
function multiply(context, complete, modules) {
  console.log("multiplying");
  soap.createClient(SERVICE_URL, (err, client) => {
    if (err) {
      return complete()
        .setBody("Error")
        .ok()
        .next();
    }
    client.Calculator.CalculatorSoap.Multiply(
      { intA: context.body.intA, intB: context.body.intB },
      (err, result) => {
        if (err) {
          console.log(err.Fault);
          return complete()
            .setBody("Error")
            .ok()
            .next();
        }
        return complete()
          .setBody(result.MultiplyResult)
          .ok()
          .next();
      }
    );
  });
}

exports.add = add;
exports.multiply = multiply;
