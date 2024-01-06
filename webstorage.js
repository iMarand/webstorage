!function(global, factory) {
    global.webstorage = factory();

    // display lib details to the console
    $:isLibDetails = false;

    // show library details
    const LibDetails = {
        App: function() {
            $:detail = {
                name: "WebStorage.js",
                author: "Marand",
                version: '1.0.0',
                releaseDate: '1:12:2024',
            }

            return detail;
        }
    }

    var app = LibDetails['App'];
    class log {
        constructor(name, version, author) {
            var isShowen = () => {
                console.log(`
                    App Name: ${name}\nVersion: ${version}\nAuthor: ${author}
                    `.trim(),
                );
            }
    
            this.show = (bool) => {
                bool ? isShowen() : null;
            }

        }
    }

    new log(
        app()['name'],
        app()['version'],
        app()['author']
    ).show(isLibDetails);

    
}(this, function() {
    class webstorage {
        constructor() {
            const log = ({}, function(O) {
                // Developer display info
                if(O.user) {
                    alert(O.message);

                    if(O.developer) {
                        console.log(O.message);
                    }
                } else if(O.developer) {
                    console.log(O.message);

                    if(O.user) {
                        alert(O.message);
                    }
                }
            });

            this.indexedb = function(configurations) {
                var u = {};

                var _c = {
                    0x01: 'name',
                    0x02: 'rule',
                    0x03: 'keyPath',
                    0x04: 'entity',
                    0x05: 'version',
                    0x06: 'structure',
                    0x07: 'uniqueIndex',
                    0x08: 'fetch',
                    messages: {
                        0xff: "Data was Successfully Stored",
                        0xfe: "Unique Index was not found",
                        0xee: "An error occurred during saving data. \n The data you saved must contain existed unique Index(Primary Key) ",
                        0xf21: "Fetch Data wasn't found",
                        0xfe3: "Unable to Fetch Result",
                        0xfe5: "Unable to find the matching Index Name"
                    }
                };
                
                u.c = configurations;
                u.r = indexedDB.open(u.c[_c[0x01]], u.c[_c[0x05]]);

                u['r']['onupgradeneeded'] = (void 0, function() {
                    u.db = u['r']['result'];

                    function c(_o) {
                        u.e = u.db['createObjectStore'](_c[0x04], _o);
                        return
                    }

                    (u[0xf] = u.c[_c[0x03]]['value'], u.c[_c[0x03]] && u[0xf]) ? c({keyPath: u[0xf]}) : 
                    (u[0xe] = u.c[_c[0x03]]['autoIncrement'], u.c[_c[0x03]] && u[0xe]) ? c({autoIncrement: u[0xe]}) : c({keyPath: 'id'});

                    function q(_i) {
                        if(_i['data'] instanceof Map) {
                            [..._i['data']].map((uIndex, i) => {
                                u.e.createIndex(uIndex[0], uIndex[1], {
                                    unique: true
                                })
                            })
                        }
                    }

                    (u.ui = u.c[_c[0x07]], u.ui) ? q(u.ui) : _c['messages'][0xfe];

                    function U(_u) {
                        if(u.c['']) {}
                    }

                });
                
                var option = {
                    set: function(D_) {
                        u[0x1f] = (null, () => {
                            u.db = u['r']['result'];
                            u._o = u['db']['transaction'](_c[0x04], u.c[_c[0x02]])['objectStore'](_c[0x04]);

                            var StoreData = void 0;

                            !function _s() {
                                var storeData_ = (_i) => {
                                    StoreData = u._o.put(_i);
    
                                    StoreData.addEventListener('success', () => {
                                        log({
                                            developer: true,
                                            message: _c['messages'][255],
                                        })
                                    });
        
                                    StoreData.addEventListener('error', () => {
                                        console.error(
                                            _c["messages"][238]
                                        )
                                    });
                                }

                                var _S = () => {
                                    for(let r of D_) {
                                        storeData_(r);
                                    }
                                }

                                u.c[_c[0x06]] && u.c[_c[0x06]] == "whole" ? storeData_(D_) : 
                                u.c[_c[0x06]] && u.c[_c[0x06]] == "single" || !u.c[_c[0x06]] ? _S() : console.error('invalid structure');
                            }()

                        });

                        u.r['addEventListener']('success', u[0x1f]);
                    },

                    get: async function(D_) {
                        var __ = null;
                        
                        u[0x2f] = async function() {
                            u.db = u['r']['result'];
                            u._t = u['db']['transaction'](_c[0x04], u.c[_c[0x02]]);
                            u._o = u['db']['transaction'](_c[0x04], u.c[_c[0x02]])['objectStore'](_c[0x04]);

                            u[0x281] = u.c[_c[0x08]];
                            u.dataType = u[0x281]['data'];
    
                            var Fetch_ = new Promise((res, rej) => {
                                var v_ = new Map();

                                v_.set('values', function() {
                                    u._o['getAll']().addEventListener('success', (DATA) => {
                                        __ = DATA;
        
                                        res(__);
                                    });
        
                                    u._o['getAll']().addEventListener('error', () => {
                                        rej(_c['messages'][0xfe3]);
                                    });
                                });

                                v_.set('keys', function() {
                                    u._o['getAllKeys']().addEventListener('success', (DATA) => {
                                        __ = DATA;
        
                                        res(__);
                                    })

                                    u._o['getAllKeys']().addEventListener('error', () => {
                                        rej(_c['messages'][0xfe3]);
                                    });
                                });

                                v_.set('index', function() {
                                    var indexName = u.c['fetch']['name'];
                                    var index = u._o.index(indexName);

                                    index['getAll']().addEventListener('success', (DATA) => {
                                        __ = DATA;

                                        index.target = index;
                                        index.target.result = index;

                                        res(index);
                                    })

                                    index['getAll']().addEventListener('error', () => {
                                        rej(_c['messages'][0xfe5]);
                                    });
                                });

                                ['index', 'keys', 'values'].map(v => {
                                    if(u['dataType'] == v) {
                                        return v_.get(v)()
                                    }
                                });

                            });

                            return await Fetch_.then((e) => {
                                return e.target.result;
                            });
                        };
                        
                        try {
                            const result = await new Promise((res_1, rej_1) => {
                                u.r['addEventListener']('success', function () {
                                    res_1(u[47]());
                                });

                                u.r['addEventListener']('error', function () {
                                    throw rej_1(_c['messages'][4067]);
                                });

                            });
                            return D_ ? D_(result) : result;
                        } catch (err) {
                            return new Error(err);
                        }

                    },

                    check: function() {

                    },
                    
                    drop: function() {
                        return "Drop Option"
                    },

                    delete: function() {
                        return "Delete Option"
                    },

                    update: function() {
                        // update the version and set the value, index, objectstore, change the values
                        u[0x6f] = (null, () => {
                            u.db = u['r']['result'];
                            u._o = u['db']['transaction'](_c[0x04], u.c[_c[0x02]])['objectStore'](_c[0x04]);

                        });


                        return "Update Option"
                    },
                }

                return option;
            }

            this.cache = function() {
                return "Welcome to Cache lib"
            }

            this.websql = function() {
                return "Welcome to webSQL lib"
            }

            this.cookie = function() {
                return "Welcome to cookies storage"
            }
        }
    }

    return new webstorage;
})