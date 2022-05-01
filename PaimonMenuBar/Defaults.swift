//
//  Defaults.swift
//  PaimonMenuBar
//
//  Created by Breezewish on 2022/4/30.
//

import Defaults
import Foundation

extension Defaults.Keys {
    static let uid = Key<String>("uid", default: "")

    static let server = Key<GenshinServer>("server", default: .cn_gf01)

    static let cookie = Key<String>("cookie", default: "")

    // resin restores every 8 minutes
    static let recordUpdateInterval = Key<Double>("update_interval", default: 60 * 8)

    static let lastGameRecord = Key<GameRecord>("game_record", default: GameRecord.empty)
}