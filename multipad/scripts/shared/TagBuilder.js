/* Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * beginning custom tag support
 *
 * This api is still experimental
 * and might be interwoven with DomQuery
 * so it is bound to change
 *
 * it follows a builder pattern to allow easier creations
 * with less code of custom tags
 */
export class TagBuilder2 {
    tagName;
    connectedCallback;
    clazz;
    extendsType = HTMLElement;
    theOptions;
    markup;

    static withTagName(tagName) {
        return new TagBuilder2(tagName);
    }

    constructor(tagName) {
        this.tagName = tagName;
    }

    withConnectedCallback(connectedCallback) {
        if (this.clazz) {
            throw Error("Class already defined, connected type must be set in the class");
        }
        this.connectedCallback = connectedCallback;
        return this;
    }

    withExtendsType(extendsType) {
        if (this.clazz) {
            throw Error("Class already defined, extends type must be set in the class");
        }
        this.extendsType = extendsType;
        return this;
    }

    withOptions(theOptions) {
        this.theOptions = theOptions;
        return this;
    }

    withClass(clazz) {
        if (this.markup) {
            throw Error("Markup already defined, markup must be set in the class");
        }
        this.clazz = clazz;
        return this;
    }

    withMarkup(markup) {
        if (this.clazz) {
            throw Error("Class already defined, markup must be set in the class");
        }
        this.markup = markup;
        return this;
    }

    register() {
        if (!this.clazz && !this.markup) {
            throw Error("Class or markup must be defined")
        }
        if (this.clazz) {
            window.customElements.define(this.tagName, this.clazz, this.theOptions || null);
        } else {

            let _t_ = this;

            window.customElements.define(this.tagName, class extends this.extendsType {
                constructor() {
                    super();
                    this.innerHTML = _t_.markup;
                }

                connectedCallback() {
                    if (_t_.connectedCallback) {
                        _t_.connectedCallback.apply(this);
                    }
                }

            }, this.theOptions || null);



        }
    }
}
